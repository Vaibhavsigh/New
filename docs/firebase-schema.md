# Firebase/Firestore Schema & Sync Strategy

This document describes the data structure in Google Cloud Firestore and the synchronization strategy with the primary MongoDB database.

## Overview
Firestore is used primarily for:
1.  **Push Notification Tokens**: Storing device tokens securely and per-user.
2.  **Notification Preferences**: Client-side toggles for notification types.
3.  **Real-time Presence**: Showing if a user is online/offline.
4.  **Real-time Feed/Notifications**: Delivering notifications to the client in real-time.

## Firestore Collections

### 1. Users Collection
Path: `/users/{firebaseUid}`

Stores user-specific settings and state that require real-time access or are client-managed.

**Document Structure:**
```json
{
  "pushTokens": [
    "fcm_token_1",
    "fcm_token_2"
  ],
  "notificationPreferences": {
    "taskReminders": true,
    "streakAlerts": true,
    "newFollowers": true,
    "mentions": true,
    "marketing": false
  },
  "presence": {
    "state": "online", // or "offline", "away"
    "lastChanged": "Timestamp"
  },
  "profilePreview": { // Synced from Mongo for UI convenience
    "displayName": "Jane Doe",
    "avatarUrl": "https://s3..."
  }
}
```

### 2. Notifications Collection
Path: `/users/{firebaseUid}/notifications/{notificationId}`

Stores individual notifications for the user's "Inbox".

**Document Structure:**
```json
{
  "title": "Streak Saved!",
  "body": "You completed your daily task.",
  "type": "streak_saved",
  "data": {
    "taskId": "mongo_object_id",
    "streakCount": 5
  },
  "isRead": false,
  "createdAt": "Timestamp"
}
```

## Sync Strategy

### MongoDB to Firestore
*   **Trigger:** When critical profile data (displayName, avatarUrl) changes in MongoDB.
*   **Mechanism:** Backend service (API) updates the corresponding Firestore document (`/users/{firebaseUid}/profilePreview`) via Firebase Admin SDK.
*   **Purpose:** Ensures real-time views (like chat or active user lists) have up-to-date names/avatars without querying Mongo constantly.

### Client to Firestore
*   **Presence:** The client app updates `/users/{uid}/presence` on connect/disconnect (using `onDisconnect` hooks).
*   **Push Tokens:** The client app writes/updates its FCM token to `pushTokens` on login/startup.
*   **Preferences:** The client app reads/writes `notificationPreferences` directly.

### Backend to Firestore (Notifications)
*   **Trigger:** Event occurs in backend (e.g., Task completed).
*   **Mechanism:** Backend uses Firebase Admin SDK to:
    1.  Send FCM push notification to tokens in `pushTokens`.
    2.  Write a record to `/users/{uid}/notifications`.
