# React Native Mobile App

This is the mobile client for the platform, built with React Native and TypeScript.

## Tech Stack
- **Framework**: React Native 0.73+
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Zustand + React Query
- **UI/Theming**: Custom Theming System (Light/Dark support)
- **Storage**: MMKV (Persistence) + Keychain (Secure)
- **Network**: Axios
- **E2E Testing**: Detox

## Features
- **Authentication**: Login, Signup, Password Reset
- **Task Management**: Create, Read, Update, Delete tasks with media support
- **Social**: Feed with likes/comments
- **Communities**: Discovery and Challenge participation
- **Profile**: User stats and settings
- **Offline Support**: Offline detection banner
- **Push Notifications**: Firebase Cloud Messaging integration

## Prerequisites
- Node.js >= 18
- Yarn
- iOS: Xcode + CocoaPods
- Android: Android Studio + JDK

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Install iOS pods (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### iOS
```bash
yarn ios
```

### Android
```bash
yarn android
```

## Testing

### Unit Tests
```bash
yarn test
```

### E2E Tests (Detox)
1. Build the app for testing:
   ```bash
   detox build -c ios.sim.debug
   ```
2. Run the tests:
   ```bash
   detox test -c ios.sim.debug
   ```

## Structure
- `src/components`: Reusable UI components
- `src/screens`: App screens organized by feature
- `src/navigation`: Navigation configuration
- `src/store`: Zustand stores
- `src/services`: API and other services
- `src/hooks`: Custom hooks
- `src/theme`: Theme configuration
- `src/utils`: Utility functions

## Key Commands
- `yarn start`: Start Metro bundler
- `yarn lint`: Run ESLint
- `yarn typecheck`: Run TypeScript compiler check
