# @monorepo/shared

Shared utilities, types, and constants used across all workspaces in the monorepo.

## Contents

- **types.ts**: Common TypeScript types and interfaces
- **utils.ts**: Utility functions
- **constants.ts**: Application-wide constants

## Usage

```typescript
import { User, ApiResponse, isValidEmail } from '@monorepo/shared';
```

## Development

```bash
# Build the package
yarn workspace @monorepo/shared build

# Watch mode
yarn workspace @monorepo/shared dev

# Run tests
yarn workspace @monorepo/shared test
```
