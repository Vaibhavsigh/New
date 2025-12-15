# Contributing Guide

Thank you for your interest in contributing to this project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `yarn install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Code Style

This project uses:
- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **Black** and **Flake8** for Python code

Run checks before committing:

```bash
yarn lint
yarn format
yarn typecheck
```

### Testing

Write tests for all new features:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test --coverage
```

### Committing Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(api): add user authentication endpoint
fix(mobile): resolve crash on app startup
docs(readme): update installation instructions
```

### Git Hooks

Pre-commit hooks will automatically:
- Lint staged files
- Format code with Prettier
- Check Python code with black and flake8

Pre-push hooks will:
- Run TypeScript type checking
- Run all tests

### Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md (if applicable)
5. Create a pull request with a clear description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] Added tests
- [ ] All tests pass
- [ ] No new warnings
```

## Project Structure

```
apps/           - Applications (mobile)
services/       - Backend services (api, algorithms)
packages/       - Shared packages
infra/          - Infrastructure code
.github/        - CI/CD workflows
scripts/        - Helper scripts
```

## Workspace Commands

```bash
# Run command in specific workspace
yarn workspace @monorepo/api <command>
yarn workspace @monorepo/algorithms <command>
yarn workspace @monorepo/mobile <command>
yarn workspace @monorepo/shared <command>

# Run command in all workspaces
yarn workspaces foreach run <command>
```

## Adding Dependencies

### To a specific workspace:
```bash
yarn workspace @monorepo/api add <package>
yarn workspace @monorepo/api add -D <package>  # dev dependency
```

### To root:
```bash
yarn add -W <package>
```

## Debugging

### API Service
```bash
# Start with debugger
yarn workspace @monorepo/api dev --inspect
```

### Python Service
```bash
cd services/algorithms
python -m pdb src/app.py
```

## Common Issues

### Yarn Install Fails
```bash
yarn cache clean
rm -rf node_modules
yarn install
```

### TypeScript Errors
```bash
yarn workspace @monorepo/shared build
yarn typecheck
```

### Tests Failing
```bash
# Clear Jest cache
yarn test --clearCache
yarn test
```

## Code Review Guidelines

When reviewing PRs:
- Check code quality and style
- Verify tests are adequate
- Ensure documentation is updated
- Look for potential bugs or edge cases
- Suggest improvements where appropriate

## Getting Help

- Create an issue for bugs or feature requests
- Use discussions for questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
