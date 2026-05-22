// docs/UI_MOCKUPS.md - Visual interface guide

# Wellness Platform - UI/UX Mockups

## 1. Home/Landing Page

```
┌─────────────────────────────────────────────────────────────┐
│  💚 Wellness Platform              [Check In] [Dashboard]    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Employee Wellness, Reimagined                              │
│                                                              │
│  A privacy-first platform for early burnout detection.      │
│  Quick weekly check-ins help us understand how you're       │
│  doing — without surveillance.                              │
│                                                              │
│  [Take Weekly Check-In (30 sec)]  [View Dashboard]         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ⚡ Fast Check-Ins    🔒 Privacy First    📊 Smart Detection│
│  30 sec surveys      Anonymous mode     AI-powered scoring  │
│                                                              │
│  💡 Wellness Nudges   👥 Team Insights   🌿 Human-Centered  │
│  Hourly reminders    Aggregated metrics  Not surveillance  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  How It Works:                                              │
│  1. Weekly Check-In       3. Privacy-First Insights         │
│  2. Smart Analysis         4. Wellness Support              │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  🔒 Your wellness, protected. Built with care.              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Check-In Page (Mobile-First)

```
┌──────────────────────────────┐
│  💚 Wellness    [← Dashboard] │
├──────────────────────────────┤
│                              │
│  Weekly Wellness Check-In    │
│                              │
│  Takes about 30 seconds.     │
│  Your honest feedback helps  │
│  us support your wellness.   │
│                              │
├──────────────────────────────┤
│                              │
│  Energy Level          🔥    │
│  ├─────●─────────────────┤   │
│  Low      Moderate    High    │
│  How much energy do you       │
│  have today?                  │
│                              │
│  Workload Level        🌪️     │
│  ├────────────●────────────┤  │
│  Light    Manageable   Heavy  │
│  How much work on your plate? │
│                              │
│  Motivation            💪    │
│  ├──────●──────────────────┤  │
│  Very Low             Very High│
│  How motivated do you feel?   │
│                              │
│  Team Support          🤝    │
│  ├─────────────●─────────────┤ │
│  None        Adequate  Excellent│
│  Feel supported by your team? │
│                              │
│  Stress Level          😰    │
│  ├──────────●──────────────┤  │
│  None    Moderate  Extreme     │
│  How stressed are you?        │
│                              │
├──────────────────────────────┤
│                              │
│  Current Mood (Optional)     │
│  😴  😔  😐  🙂  😄  🤩  😎  🥳 │
│                              │
│  Additional Notes (Optional) │
│  [Text area: max 120 chars]   │
│                              │
│  ☐ I would like HR to        │
│    contact me about wellness │
│                              │
├──────────────────────────────┤
│                              │
│  Anonymous Response   [Toggle]│
│  Your name won't be           │
│  associated with this         │
│                              │
│  [Submit Check-In]            │
│                              │
│  🔒 Your responses are        │
│  confidential and encrypted   │
│                              │
└──────────────────────────────┘
```

---

## 3. Dashboard - Overview Page

```
┌──────────────────────────────────────────────────────────────┐
│  HR Wellness Dashboard              [📥 Export Report]        │
│  Real-time employee wellness metrics & burnout detection     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────┐
│  │ Overall     │  │ Participation│  │ Total       │  │ Depts│
│  │ Wellness    │  │ Rate         │  │ Employees   │  │      │
│  │ Score       │  │              │  │             │  │      │
│  │    68       │  │    73%       │  │    150      │  │  8   │
│  │  ███████░   │  │  ███████░    │  │             │  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────┘
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Risk Distribution          │  Filter by Department        │
│                             │                              │
│         Healthy (95)        │  ○ All Departments          │
│       /            \        │  ○ Engineering              │
│      /              \       │  ○ Product                  │
│     |   Watch (35)   |      │  ○ Sales                    │
│     |      63°       |      │  ○ HR                       │
│    /                  \     │  ○ Marketing                │
│   /   High Risk (15)   \    │                              │
│  /        50°          \    │                              │
│ |   Critical (5)       |    │                              │
│ |        13°           |    │                              │
│                             │                              │
│ ┌─────┐ ┌─────┐ ┌─────┐   │                              │
│ │ 95  │ │ 35  │ │ 15  │ 5 │                              │
│ └─────┘ └─────┘ └─────┘   │                              │
│                             │                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  🚨 Critical Alerts (3)                                      │
│                                                              │
│  ├─ John Doe (Engineering)      Score: 89/100 [Critical]   │
│  │  └─ [Contact Employee]                                  │
│  │                                                          │
│  ├─ Sarah Johnson (Sales)        Score: 82/100 [High Risk] │
│  │  └─ [Contact Employee]                                  │
│  │                                                          │
│  └─ Mike Chen (Engineering)      Score: 78/100 [High Risk] │
│     └─ [Contact Employee]                                  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  🔒 All employee data is aggregated and anonymized by       │
│  default. Individual data only shown when critical or       │
│  with employee consent.                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Dashboard - Department Metrics

```
┌──────────────────────────────────────────────────────────────┐
│ Engineering Department Wellness Overview                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Avg Burnout Score: 55        Participation: 85%            │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │ Healthy    Watch    High Risk   Critical        │       │
│  │   45        20         8            2           │       │
│  │ ████████  ████       ██          ▌             │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  Weekly Trend (Last 4 Weeks):                               │
│                                                              │
│  Score                                                      │
│    80 ┤                                                     │
│    70 ┤        ╱─────                                        │
│    60 ┤   ╱───╱     ╲                                        │
│    50 ┤──╱           ╲─                                      │
│    40 ┤              ╲╲╲                                     │
│       └─────────────────── Week                             │
│       W1  W2  W3  W4                                         │
│                                                              │
│  Team Members at Risk:                                       │
│  • Sarah (Score: 78) - High workload, low support           │
│  • Mike (Score: 72) - Declining motivation                  │
│  • Lisa (Score: 65) - High stress, improving               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Wellness Nudge Notification

```
┌────────────────────────────────┐
│ 🌟 Wellness Reminder            │
├────────────────────────────────┤
│                                │
│ Take a short walk 🚶            │
│                                │
│ You've been working for        │
│ the past hour. Time for a      │
│ quick break!                   │
│                                │
│           [Dismiss]             │
│                                │
└────────────────────────────────┘
```

---

## 6. Burnout Score Breakdown (In-App)

```
┌──────────────────────────────────────────────────────────────┐
│ Your Burnout Score: 62 (High Risk) 🟠                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Score Breakdown:                                             │
│                                                              │
│ Energy Level          ░░░░░░░░░░░░░░░░░░░░░░ 60 pts       │
│ (Low energy detected)                                        │
│                                                              │
│ Workload Level        ░░░░░░░░░░░░░░░░░░░░░░░░ 100 pts    │
│ (Very high workload)                                         │
│                                                              │
│ Motivation            ░░░░░░░░░░░░░░░░░░░░░░ 60 pts       │
│ (Motivation decline)                                         │
│                                                              │
│ Team Support          ░░░░░░░░░░░░ 40 pts                 │
│ (Adequate support)                                           │
│                                                              │
│ Stress Level          ░░░░░░░░░░░░░░░░░░░░░░░░ 100 pts    │
│ (Very high stress)                                           │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ 🔍 Detected Patterns:                                        │
│ • Overload Pattern (High workload + Low energy)             │
│ • Sustained Stress (4 weeks of high stress)                 │
│                                                              │
│ 💡 Recommendations:                                          │
│ • Review workload - Consider delegating tasks               │
│ • Schedule 1:1 with manager                                 │
│ • Access mental health resources                            │
│ • Take time off if possible                                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 7. Risk Level Color Coding

```
┌─────────────────────────────────────────┐
│ Risk Level Visual Indicators            │
├─────────────────────────────────────────┤
│                                         │
│ 🟢 Healthy (0-35)                       │
│    ████████████████ Good wellness      │
│                                         │
│ 🟡 Watch (35-60)                        │
│    ████████████░░░░ Monitor closely    │
│                                         │
│ 🟠 High Risk (60-80)                    │
│    ████████░░░░░░░░ Intervention needed│
│                                         │
│ 🔴 Critical (80-100)                    │
│    ████░░░░░░░░░░░░ Immediate action   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 8. Mobile Experience (Responsive)

```
Desktop (1200px+):          Tablet (768px-1200px):    Mobile (<768px):
┌──────────────────────┐    ┌─────────────────┐      ┌──────────┐
│ Dashboard            │    │ Dashboard       │      │Dashboard │
│ ┌──────┐ ┌──────┐   │    │ ┌─────┐ ┌─────┐│      │┌──────┐  │
│ │Card1 │ │Card2 │   │    │ │Card1│ │Card2││      ││Card1 │  │
│ └──────┘ └──────┘   │    │ └─────┘ └─────┘│      │└──────┘  │
│ ┌──────┐ ┌──────┐   │    │ ┌─────────────┐│      │┌──────┐  │
│ │Card3 │ │Card4 │   │    │ │Chart        ││      ││Card2 │  │
│ └──────┘ └──────┘   │    │ └─────────────┘│      │└──────┘  │
│ ┌─────────────────┐  │    │ ┌─────────────┐│      │┌──────┐  │
│ │Chart            │  │    │ │Alerts       ││      ││Card3 │  │
│ └─────────────────┘  │    │ └─────────────┘│      │└──────┘  │
│ ┌─────────────────┐  │    │                 │      │┌──────┐  │
│ │Alerts           │  │    │                 │      ││Chart │  │
│ └─────────────────┘  │    │                 │      │└──────┘  │
└──────────────────────┘    └─────────────────┘      │┌──────┐  │
                                                      ││Alerts│  │
                                                      │└──────┘  │
                                                      └──────────┘
```

---

## 9. Color Palette

```
Primary Colors:
  🔵 Blue (#667eea)       - Main brand color
  💜 Purple (#764ba2)     - Accent

Wellness Status:
  🟢 Green (#10b981)      - Healthy
  🟡 Amber (#f59e0b)      - Watch
  🟠 Orange (#f97316)     - High Risk
  🔴 Red (#ef4444)        - Critical

Neutrals:
  ⚫ Dark Slate (#0f172a)  - Text
  ⚪ Light Slate (#f1f5f9) - Background
```

---

## 10. Data Visualization Examples

```
Energy Levels Over Time:
  Week 1: ████░░░░░░ (low)
  Week 2: ██████░░░░ (moderate)
  Week 3: ████░░░░░░ (declining)
  Week 4: ██░░░░░░░░ (critical)

Team Distribution (Stacked Bar):
  Engineering: ████████░░░ (85 healthy, 15 at-risk)
  Sales:       ██████████░ (95 healthy, 5 at-risk)
  Product:     ███████░░░░ (70 healthy, 30 at-risk)
  HR:          █████████░░ (90 healthy, 10 at-risk)

Score Trend (Line Graph):
  ┌─────────────────────────────────┐
  │ ╱╲                             │
  │╱  ╲╱╲╱╲              ╱╲      │
  │      ╲╱╲  ╱╲    ╱╲╱    │
  │           ╱  ╲╱  ╲╱    │
  │────────────────────────────────│
```

---

## 11. User Journey Map

```
Employee Flow:
  1. Visit homepage
       ↓
  2. Login/Navigate to check-in
       ↓
  3. Complete 5-question survey (30 sec)
       ↓
  4. Optional: Add note, select mood, request HR contact
       ↓
  5. Submit anonymously or identified
       ↓
  6. See risk score & recommendations
       ↓
  7. Receive wellness nudges throughout day
       ↓
  8. Access dashboard to view own trends

HR Manager Flow:
  1. Login to dashboard
       ↓
  2. View overall wellness metrics
       ↓
  3. Filter by department
       ↓
  4. Review critical alerts
       ↓
  5. Contact at-risk employees
       ↓
  6. Export reports for stakeholders
```

---

## 12. Responsive Design Breakpoints

```
Mobile:     < 640px   (Single column)
Tablet:     640-1024px (2 columns)
Desktop:    > 1024px  (3-4 columns)

All text scales automatically
All charts are responsive
Touch-friendly on mobile (larger tap targets)
```
