# AGENTS.md

## Project

Playwright E2E tests for web application.
TypeScript, CommonJS, Biome formatter.

## Commands

```bash
npm run e2e              # run tests (prod by default)
ENV=stage npm run e2e    # run against staging
npm run fmt              # format with Biome
npm run lint             # lint with Biome
npm run typecheck        # typecheck with TypeScript
```

## Environment

Loads `.env.{ENV}` via dotenv. Default: `prod`.

- `.env.prod` — production BASE_URL
- `.env.stage` — staging URL (fill in)
- `.env.dev` — local dev (create when needed)

Config: `playwright.config.ts` reads `process.env.ENV || 'prod'`.

## Code Style

Biome enforces:
- **Tabs** for indentation (not spaces)
- **Double quotes** for strings
- `recommended` lint rules

**No comments in code.** Code must be self-documenting through naming. Never leave comments.

Run `npm run fmt` before committing.

## Testing

- Tests in `tests/` directory
- Use `getByTestId()` for element selection (data-testid attributes)
- Reporter: `line` + `allure-playwright`
- Artifacts: screenshots, video, traces always on

## CI

GitHub Actions (`.github/workflows/playwright.yml`):
- Triggers on push/PR to `main` or `master`
- `npm ci` → `npx playwright install --with-deps` → `npx playwright test`
- Uploads `playwright-report/` artifact (30 days retention)

## Pre-commit

Runs via `pre-commit`:
- `biome-check` (format + lint)
- `typecheck` (TypeScript type checking)
- `actionlint` (GitHub Actions validation)
- `check-jsonschema` (dependabot, workflows, actions)
- Standard hooks (trailing whitespace, end-of-file, yaml/toml/xml checks)
