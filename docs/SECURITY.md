// docs/SECURITY.md - Security best practices

# Security & Privacy Best Practices

## Data Classification

### Public Data
- General wellness trends
- Aggregate department metrics
- Public awareness content

### Internal Data
- Individual wellness scores
- Check-in responses
- Team metrics

### Sensitive Data
- Employee contact requests
- Medical/wellness notes
- HR follow-up records

## Access Control

### Role-Based Access Control (RBAC)

**Employee**
- ✅ Can submit own check-in
- ✅ Can view own wellness history
- ✅ Can opt into anonymous mode
- ❌ Cannot view other employees' data

**Manager**
- ✅ Can view team wellness trends
- ✅ Can view team aggregates
- ✅ Can see anonymized alerts
- ❌ Cannot identify individual employees in aggregate data

**HR**
- ✅ Can view all dashboard metrics
- ✅ Can identify critical risk cases
- ✅ Can access contact requests
- ✅ Can export reports
- ❌ Cannot view individual check-ins without consent

**Admin**
- ✅ Full system access
- ✅ User management
- ✅ System configuration
- ✅ Audit log access

## Authentication & Authorization

### Implementation
```typescript
// NextAuth.js with multiple providers
export const authOptions = {
  providers: [
    GoogleProvider({ clientId, clientSecret }),
    CredentialsProvider({ /* ... */ }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.department = user.department;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.department = token.department;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
```

### Session Management
- 24-hour session expiration
- Automatic logout on inactivity
- Secure HTTP-only cookies
- CSRF token protection

## Data Protection

### Encryption

**At Rest**
```typescript
// Database field encryption for sensitive data
import crypto from 'crypto';

function encryptSensitiveData(data: string): string {
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    randomIV
  );
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// Encrypt contact reasons, notes before storing
```

**In Transit**
- HTTPS/TLS 1.3 enforced
- No sensitive data in URLs
- POST requests for all data submission

### Data Minimization
```typescript
// Never store sensitive personal data
const checkInData = {
  // ✅ OK
  energyLevel: 3,
  workloadLevel: 4,
  burnoutScore: 55,
  
  // ❌ Never store
  // employeeName: 'John Doe',     // Use ID instead
  // ssn: '123-45-6789',           // Never store
  // personalHealthData: '...',    // Use healthcare APIs
};
```

## API Security

### Input Validation
```typescript
// Validate all API inputs
import { z } from 'zod';

const CheckInSchema = z.object({
  energyLevel: z.number().int().min(1).max(5),
  workloadLevel: z.number().int().min(1).max(5),
  note: z.string().max(120).optional(),
  requestsHRContact: z.boolean(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  try {
    const validated = CheckInSchema.parse(body);
    // Process validated data
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}
```

### Rate Limiting
```typescript
// Prevent abuse
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip || 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
}
```

### CORS & Security Headers
```javascript
// next.config.js
const nextConfig = {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: "default-src 'self'" },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};
```

## Privacy Compliance

### GDPR Compliance
- ✅ Right to access: Export personal data
- ✅ Right to erasure: Delete account + data
- ✅ Right to portability: Download data
- ✅ Consent management: Explicit opt-in for tracking
- ✅ Privacy policy: Clear, transparent

### Implementation
```typescript
// GDPR endpoints
// DELETE /api/privacy/delete-account
// GET /api/privacy/export-data
// POST /api/privacy/consent

export async function DELETE(request: NextRequest) {
  const employeeId = request.nextUrl.searchParams.get('id');
  
  // 1. Log deletion request
  await logAudit('ACCOUNT_DELETION_REQUESTED', { employeeId });
  
  // 2. Delete personal data
  await prisma.employee.delete({ where: { id: employeeId } });
  await prisma.checkIn.deleteMany({ where: { employeeId } });
  
  // 3. Keep anonymized data for analytics
  await prisma.auditLog.create({
    data: {
      action: 'ACCOUNT_DELETED',
      timestamp: new Date(),
    },
  });
  
  return NextResponse.json({ success: true });
}
```

### Data Retention
```typescript
// Auto-delete old data per policy
const RETENTION_PERIOD_DAYS = 90;

export async function deleteOldData() {
  const cutoffDate = subDays(new Date(), RETENTION_PERIOD_DAYS);
  
  await prisma.checkIn.deleteMany({
    where: { createdAt: { lt: cutoffDate } },
  });
  
  await prisma.contactRequest.deleteMany({
    where: {
      createdAt: { lt: cutoffDate },
      resolved: true,
    },
  });
}
```

## Audit & Monitoring

### Audit Logging
```typescript
// Log all sensitive operations
export async function logAudit(
  action: string,
  details: Record<string, any>,
  userId?: string
) {
  await prisma.auditLog.create({
    data: {
      action,
      details: JSON.stringify(details),
      userId,
      timestamp: new Date(),
    },
  });
}

// Usage
await logAudit('CHECK_IN_SUBMITTED', {
  employeeId,
  riskLevel,
  burnoutScore,
  isAnonymous,
});
```

### Security Events to Log
- Login attempts (success/failure)
- Dashboard access
- Data exports
- Account modifications
- Permission changes
- Sensitive data access
- Failed validations

## Secrets Management

### Environment Variables
```bash
# .env.local (NEVER commit)
DATABASE_URL=postgresql://user:pass@localhost/wellness
NEXTAUTH_SECRET=your-random-secret
ENCRYPTION_KEY=your-256-bit-key
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Generate strong secrets
openssl rand -base64 32  # NextAuth secret
openssl rand -hex 32    # Encryption key (256-bit)
```

### Secrets in Production
- Use managed secrets (AWS Secrets Manager, Vercel KV)
- Rotate secrets regularly
- No hardcoded secrets
- Separate secrets per environment

## Client-Side Security

### XSS Prevention
```typescript
// Always sanitize user input
import DOMPurify from 'isomorphic-dompurify';

// When displaying user-generated content
const sanitizedNote = DOMPurify.sanitize(userNote);

// React automatically escapes by default
<p>{userNote}</p>  // Safe - auto-escaped
```

### CSRF Protection
- NextAuth.js provides CSRF protection
- Verify origin for API calls
- Use SameSite cookies

```typescript
// API route CSRF check
import { csrf } from 'next-auth/middleware';

export const middleware = csrf();
```

## Dependency Security

### Regular Updates
```bash
# Check for vulnerabilities
npm audit

# Update packages
npm update
npm audit fix

# Use Dependabot on GitHub
# Automated PRs for security updates
```

### Supply Chain Security
- Pin exact versions in package.json
- Review dependencies before updating
- Use private npm registry if needed
- Monitor for malicious packages

## Incident Response

### Breach Protocol
1. **Immediate**
   - Isolate affected systems
   - Revoke compromised tokens
   - Enable audit logging

2. **Investigation (24 hours)**
   - Analyze logs
   - Identify scope of breach
   - Determine root cause

3. **Notification (72 hours)**
   - Notify affected users
   - Report to data protection authority
   - Prepare public statement

4. **Recovery**
   - Patch vulnerabilities
   - Reset credentials
   - Monitor for recurrence

## Testing Security

```typescript
// Security test examples
describe('API Security', () => {
  test('should reject unauthenticated requests', async () => {
    const res = await fetch('/api/dashboard/metrics');
    expect(res.status).toBe(401);
  });

  test('should validate input', async () => {
    const res = await fetch('/api/checkin/submit', {
      method: 'POST',
      body: JSON.stringify({ energyLevel: 10 }), // Invalid
    });
    expect(res.status).toBe(400);
  });

  test('should rate limit requests', async () => {
    // Make 11 requests
    for (let i = 0; i < 11; i++) {
      const res = await fetch('/api/checkin/submit');
      if (i === 10) expect(res.status).toBe(429);
    }
  });
});
```

## Recommended Security Tools

- **Dependabot**: Automated dependency updates
- **Snyk**: Vulnerability scanning
- **SonarQube**: Code quality & security
- **OWASP**: Security best practices
- **Zap**: API security testing
- **Vercel**: Infrastructure security

