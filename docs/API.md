# Wellness Platform - API Documentation

## Base URL

```
https://wellness-platform.example.com/api
```

## Authentication

All endpoints require authentication via NextAuth.js session or API key.

```bash
# Session-based (default)
Cookie: next-auth.session-token=...

# API Key (optional)
Header: Authorization: Bearer api_key_here
```

## Endpoints

### Check-In Submission

**POST** `/checkin/submit`

Submit a weekly wellness check-in.

**Request Body:**
```json
{
  "employeeId": "emp_12345",
  "energyLevel": 3,
  "workloadLevel": 4,
  "motivation": 2,
  "teamSupport": 3,
  "stressLevel": 4,
  "note": "Feeling overwhelmed with current project",
  "moodEmoji": "😐",
  "requestsHRContact": true,
  "isAnonymous": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "checkIn": {
    "id": "checkin_xyz",
    "burnoutScore": 62,
    "riskLevel": "high_risk",
    "patterns": [
      {
        "type": "overload",
        "severity": "high",
        "description": "High workload combined with low energy - risk of burnout"
      }
    ]
  }
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Invalid input",
  "details": {
    "energyLevel": "Must be between 1 and 5"
  }
}
```

### Dashboard Metrics

**GET** `/dashboard/metrics`

Fetch aggregated wellness metrics for HR dashboard.

**Query Parameters:**
- `department` (optional): Filter by department
- `days` (optional, default: 30): Number of days to include

**Response (200 OK):**
```json
{
  "overallWellnessScore": 68,
  "totalEmployees": 150,
  "participationRate": 73,
  "departmentMetrics": [
    {
      "department": "Engineering",
      "avgBurnoutScore": 55,
      "healthyCount": 45,
      "watchCount": 20,
      "highRiskCount": 8,
      "criticalCount": 2,
      "participationRate": 85
    }
  ],
  "criticalAlerts": [
    {
      "id": "checkin_abc",
      "employeeId": "emp_456",
      "employeeName": "Anonymous",
      "department": "Sales",
      "burnoutScore": 89,
      "riskLevel": "critical",
      "createdAt": "2024-05-21T10:00:00Z"
    }
  ],
  "riskDistribution": {
    "healthy": 95,
    "watch": 35,
    "highRisk": 15,
    "critical": 5
  }
}
```

### Wellness Nudges

**GET** `/wellness/nudges`

Get randomized wellness reminders.

**Query Parameters:**
- `category` (optional): Filter by category (walk, screen-break, hydration, stretching, breathing)
- `count` (optional, default: 1): Number of nudges to return

**Response (200 OK):**
```json
{
  "nudges": [
    {
      "id": "nudge_1",
      "message": "Take a short walk 🚶",
      "emoji": "🚶",
      "category": "walk",
      "active": true
    }
  ]
}
```

## Error Handling

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 400  | Bad Request | Invalid input data |
| 401  | Unauthorized | Missing or invalid authentication |
| 403  | Forbidden | Insufficient permissions |
| 404  | Not Found | Resource not found |
| 409  | Conflict | Duplicate check-in (already submitted this week) |
| 429  | Too Many Requests | Rate limit exceeded |
| 500  | Internal Server Error | Server error |

### Error Response Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

## Rate Limiting

- **Check-in endpoint**: 10 requests per hour per user
- **Dashboard endpoint**: 100 requests per hour per user
- **General API**: 1000 requests per hour per IP

Headers returned:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1621641600
```

## Webhooks (Future)

Subscribe to events:
- `checkin.submitted`
- `risk_alert.critical`
- `employee.wellness_improved`
- `bulk_export.completed`

## SDK & Client Libraries

```typescript
// TypeScript SDK example
import { WellnessClient } from '@wellness-platform/sdk';

const client = new WellnessClient({
  apiUrl: 'https://wellness-platform.example.com/api',
  apiKey: 'your_api_key',
});

// Submit check-in
const result = await client.checkins.submit({
  energyLevel: 3,
  workloadLevel: 4,
  // ...
});

// Get dashboard metrics
const metrics = await client.dashboard.getMetrics({
  department: 'Engineering',
  days: 30,
});
```
