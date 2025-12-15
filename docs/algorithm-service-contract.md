# Algorithm Service Data Contracts

This document defines the input and output data schemas for the Python-based algorithm service, which handles complex logic for streaks, badges, and leaderboards.

## 1. Streak Calculation Service

Calculates the current and longest streak for a user based on their activity history.

### Endpoint: `/algorithms/calculate-streak`

**Method:** POST

**Input (JSON):**

```json
{
  "userId": "string",
  "timezone": "string", // e.g., "America/New_York"
  "frequency": "string", // "daily", "weekly", "custom"
  "customDays": ["mon", "wed"], // if frequency is custom
  "activityLog": [
    "2023-10-01T10:00:00Z",
    "2023-10-02T09:30:00Z",
    "2023-10-04T11:00:00Z"
  ]
}
```

**Output (JSON):**

```json
{
  "userId": "string",
  "currentStreak": 2,
  "longestStreak": 10,
  "isStreakActive": true,
  "nextDeadline": "2023-10-05T23:59:59Z"
}
```

## 2. Badge Evaluation Service

Determines if a user has earned any new badges based on a recent event.

### Endpoint: `/algorithms/evaluate-badges`

**Method:** POST

**Input (JSON):**

```json
{
  "userId": "string",
  "triggerEvent": {
    "type": "task_completed",
    "taskId": "string",
    "timestamp": "2023-10-05T10:00:00Z"
  },
  "userStats": {
    "totalTasksCompleted": 50,
    "currentStreak": 5,
    "daysActive": 30
  },
  "existingBadgeIds": ["badge_id_1", "badge_id_2"]
}
```

**Output (JSON):**

```json
{
  "newlyAwardedBadges": [
    {
      "badgeKey": "high_five",
      "awardedAt": "2023-10-05T10:00:00Z",
      "reason": "Completed 50 tasks"
    }
  ]
}
```

## 3. Leaderboard Snapshot Generation

Aggregates points and ranks users for a specific period.

### Endpoint: `/algorithms/generate-leaderboard`

**Method:** POST

**Input (JSON):**

```json
{
  "period": "weekly",
  "startDate": "2023-10-01T00:00:00Z",
  "endDate": "2023-10-07T23:59:59Z",
  "scope": "global", // or "community"
  "communityId": null,
  "userScores": [
    { "userId": "u1", "score": 150 },
    { "userId": "u2", "score": 200 }
  ]
}
```

**Output (JSON):**

```json
{
  "rankings": [
    { "userId": "u2", "score": 200, "rank": 1 },
    { "userId": "u1", "score": 150, "rank": 2 }
  ],
  "generatedAt": "2023-10-08T00:00:01Z"
}
```
