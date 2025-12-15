# @monorepo/mobile

React Native mobile application.

## Prerequisites

- Node.js >= 18
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

## Development

```bash
# Install dependencies (from root)
yarn install

# Start Metro bundler
yarn workspace @monorepo/mobile start

# Run on iOS
yarn workspace @monorepo/mobile ios

# Run on Android
yarn workspace @monorepo/mobile android

# Run tests
yarn workspace @monorepo/mobile test
```

## Environment Setup

Copy `.env.example` to `.env` and configure API endpoints.

## Building

### iOS

```bash
cd ios
pod install
cd ..
yarn workspace @monorepo/mobile ios --configuration Release
```

### Android

```bash
cd android
./gradlew assembleRelease
```

## Project Structure

- `src/` - Application source code
- `ios/` - iOS native code
- `android/` - Android native code
- `__tests__/` - Test files
