// docs/DEPLOYMENT.md - Deployment guide

# Deployment Guide

## Pre-Deployment Checklist

### Environment Setup
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Secrets stored securely
- [ ] SSL certificates valid
- [ ] Domain registered and DNS configured
- [ ] Email service configured (for notifications)
- [ ] Backup strategy in place

### Code Quality
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Linting passed
- [ ] Security audit passed
- [ ] Load testing completed
- [ ] Accessibility audit passed
- [ ] Performance budget met

## Development Environment

### Setup
```bash
# Clone and install
git clone <repo>
cd wellness-platform-wwfna
npm install

# Configure environment
cp .env.example .env.local

# Setup database
npx prisma migrate dev
npx prisma db seed

# Run dev server
npm run dev

# Open http://localhost:3000
```

### Database Setup
```bash
# Create local PostgreSQL database
createdb wellness_platform

# Or use Docker
docker run --name postgres-wellness \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=wellness_platform \
  -p 5432:5432 \
  -d postgres:latest

# Run migrations
npx prisma migrate dev

# Seed data (optional)
npx prisma db seed
```

## Staging Deployment (Recommended)

### Using Vercel

1. **Connect Repository**
   ```
   vercel link
   ```

2. **Configure Environment**
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add ENCRYPTION_KEY
   ```

3. **Deploy Preview**
   ```bash
   git push origin feature-branch
   # Automatic preview deployment created
   ```

4. **Deploy to Staging**
   ```bash
   vercel --prod --scope staging
   ```

### Database Migrations on Vercel
```bash
# Before deploying
npx prisma migrate deploy

# Or create migration
npx prisma migrate dev --name add_new_feature
```

## Production Deployment

### Using Vercel (Recommended for simplicity)

```bash
# Setup production environment
vercel env add DATABASE_URL --prod
vercel env add NEXTAUTH_SECRET --prod
vercel env add ENCRYPTION_KEY --prod

# Deploy to production
git push origin main
# Automatic production deployment

# Or manual
vercel --prod
```

### Using AWS (for more control)

#### 1. EC2 Setup
```bash
# Launch Ubuntu 22.04 instance
# Install dependencies
sudo apt-get update
sudo apt-get install -y nodejs npm postgresql

# Clone repository
git clone <repo>
cd wellness-platform-wwfna

# Install packages
npm install

# Build
npm run build

# Setup environment
cp .env.example .env.production
# Edit .env.production with production secrets
```

#### 2. Database Setup (RDS)
```bash
# Create PostgreSQL RDS instance
# Configure security groups to allow EC2 access

# Run migrations
DATABASE_URL=postgresql://... npx prisma migrate deploy
```

#### 3. Application Setup
```bash
# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start npm --name "wellness-platform" -- start

# Save PM2 config
pm2 save
pm2 startup

# Configure nginx as reverse proxy
sudo apt-get install nginx

# Create /etc/nginx/sites-available/wellness
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/wellness /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl start nginx
```

#### 4. SSL/TLS (Let's Encrypt)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Using Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY .next .next
COPY public public
COPY prisma prisma

# Run migrations and start
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

EXPOSE 3000
```

```bash
# Build and run
docker build -t wellness-platform .
docker run -e DATABASE_URL=postgresql://... wellness-platform
```

### Using Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wellness-platform
spec:
  replicas: 3
  selector:
    matchLabels:
      app: wellness-platform
  template:
    metadata:
      labels:
        app: wellness-platform
    spec:
      containers:
      - name: app
        image: your-registry/wellness-platform:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

## Database Backups

### Automated Backups
```bash
# RDS automatic backups (AWS)
- Retention period: 30 days
- Backup window: 2 AM UTC
- Multi-AZ enabled

# Or use pg_dump
pg_dump wellness_platform > backup_$(date +%Y%m%d).sql
```

### Restore from Backup
```bash
# RDS restore
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier wellness-restored \
  --db-snapshot-identifier <snapshot-id>

# pg_dump restore
psql wellness_platform < backup_20240521.sql
```

## Monitoring & Health Checks

### Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET(request: NextRequest) {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date(),
      version: '1.0.0',
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

### Monitoring Tools
- **Datadog**: Application monitoring
- **New Relic**: Performance monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay (optional)
- **Vercel Analytics**: Built-in performance metrics

### Alerting
```yaml
# Configure alerts for:
- High error rates (>1%)
- Database connection failures
- API response time > 2s
- Memory usage > 80%
- Disk space < 10%
```

## Continuous Deployment

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Post-Deployment

### Verification
```bash
# Check deployment
curl https://yourdomain.com/api/health

# Verify SSL
openssl s_client -connect yourdomain.com:443

# Check performance
curl -w "@curl-format.txt" https://yourdomain.com
```

### Monitoring First 24 Hours
- Monitor error logs
- Check API response times
- Verify database connections
- Monitor resource usage
- Test critical user flows

### Rollback Plan
```bash
# If issues detected
# Option 1: Revert commit
git revert <commit-hash>
git push origin main

# Option 2: Manual rollback
vercel rollback

# Option 3: Database rollback
# Restore from recent snapshot
```

## Scaling Strategy

### Horizontal Scaling
- Use load balancer (AWS ALB, Nginx)
- Multiple app instances
- Session management (Redis)
- Static asset caching (CloudFront)

### Vertical Scaling
- Increase instance size
- Database replicas for read-heavy workloads
- Redis cache layer
- Database query optimization

### Database Optimization
```sql
-- Add indexes
CREATE INDEX idx_employee_department ON employees(department);
CREATE INDEX idx_checkin_week_year ON check_ins(year, week);
CREATE INDEX idx_wellness_data_score ON wellness_data(current_burnout_score);

-- Analyze query plans
EXPLAIN ANALYZE SELECT * FROM check_ins WHERE year = 2024;
```

## Disaster Recovery

### RTO (Recovery Time Objective): 1 hour
### RPO (Recovery Point Objective): 15 minutes

### Backup Strategy
1. **Daily**: Full database backup
2. **Every 15 min**: Incremental backup
3. **Cross-region**: Replicated backup
4. **Off-site**: Archive backup (90 days)

### Recovery Steps
1. Restore database from latest snapshot
2. Rebuild application from version tag
3. Verify data integrity
4. Monitor for issues
5. Communicate with stakeholders

