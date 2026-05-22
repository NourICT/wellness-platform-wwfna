# Contributing to Wellness Platform

## Code of Conduct

This project is committed to providing a welcoming, inclusive, and harassment-free environment for everyone.

### Our Pledge

We are committed to:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Accepting constructive criticism gracefully
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/wellness-platform-wwfna.git
   cd wellness-platform-wwfna
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create .env.local for development**
   ```bash
   cp .env.example .env.local
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Before Making Changes

1. Check existing issues and PRs
2. Discuss major changes in an issue first
3. Follow the project's coding standards

### Making Changes

1. **Write clean, readable code**
   - Follow TypeScript best practices
   - Use meaningful variable names
   - Keep functions focused and small

2. **Add tests for new features**
   ```bash
   npm test
   ```

3. **Keep commits atomic and descriptive**
   ```bash
   git commit -m "feat: add wellness nudge scheduling"
   ```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Tests
- `chore`: Build, dependencies

**Examples:**
```
feat(burnout-score): improve trend detection algorithm
fix(api): handle null values in dashboard metrics
docs(security): add GDPR compliance section
```

## Code Style

### TypeScript
- Use strict mode
- Define explicit types
- Avoid `any` types
- Use interfaces for object shapes

```typescript
// ✅ Good
interface CheckInData {
  energyLevel: number;
  workloadLevel: number;
}

// ❌ Avoid
const data: any = { energyLevel: 3 };
```

### React Components
- Use functional components
- Use hooks for state management
- Prop drilling should be minimal (use context/store)
- Memoize expensive computations

```typescript
// ✅ Good
export default function CheckInForm({ onSubmit }: Props) {
  const { formData, updateField } = useCheckInStore();
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### CSS/Tailwind
- Use Tailwind classes for styling
- Keep utility classes organized
- Use `@apply` for reusable patterns

```css
/* ✅ Good */
@layer components {
  .card {
    @apply rounded-2xl border border-slate-200 bg-white p-6 shadow-sm;
  }
}
```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- burnout-score.test.ts

# Watch mode
npm test -- --watch
```

### Writing Tests
```typescript
import { calculateBurnoutScore, getRiskLevel } from '@/lib/burnout-score';

describe('Burnout Score', () => {
  test('should return 0 for all perfect scores', () => {
    const result = calculateBurnoutScore({
      energyLevel: 5,
      workloadLevel: 1,
      motivation: 5,
      teamSupport: 5,
      stressLevel: 1,
    });
    expect(result).toBe(0);
  });

  test('should detect critical risk', () => {
    const result = calculateBurnoutScore({
      energyLevel: 1,
      workloadLevel: 5,
      motivation: 1,
      teamSupport: 1,
      stressLevel: 5,
    });
    expect(getRiskLevel(result)).toBe('critical');
  });
});
```

## Linting & Formatting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix

# Type check
npm run type-check
```

## Documentation

### For New Features
1. Update README if needed
2. Add JSDoc comments
3. Update relevant documentation files

```typescript
/**
 * Calculate burnout risk score based on wellness metrics
 * @param input - Employee wellness data
 * @returns Burnout score (0-100)
 */
export function calculateBurnoutScore(input: BurnoutScoreInput): number {
  // implementation
}
```

## Pull Request Process

1. **Create PR with clear description**
   - What does this change?
   - Why is it needed?
   - Testing done

2. **Link related issues**
   ```
   Fixes #123
   Related to #456
   ```

3. **Ensure CI passes**
   - Tests must pass
   - No linting errors
   - TypeScript strict mode

4. **Request review**
   - At least 1 approval required
   - Address feedback

5. **Squash and merge** (for small changes)

## Reporting Bugs

### Bug Report Template
```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: macOS/Windows/Linux
- Node version: 18.x
- Browser: Chrome/Firefox

## Screenshots
If applicable
```

## Feature Requests

### Feature Request Template
```markdown
## Problem
Describe the problem this solves

## Solution
Describe your proposed solution

## Alternatives
Other approaches considered

## Use Cases
Who benefits and how
```

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md
- Release notes
- Project documentation

Thank you for contributing! 🎉
