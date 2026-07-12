---
name: e2e-playwright
description: |
  Write UI E2E tests for any Playwright JS/TS project using @playwright/test, following the
  established Page Object and component patterns. Use this skill whenever the user asks to write
  e2e tests, create ui autotests, cover a page with playwright tests, write playwright specs,
  or wants to test any web page functionality through automated browser tests. Also trigger when
  the user mentions "автотесты", "ui тесты", "e2e", "playwright тесты", "покрыть тестами страницу",
  or wants to test a specific feature on a site.
---

# E2E Playwright Test Writer

This skill writes UI E2E tests for Playwright JS/TS projects using `@playwright/test`.
It follows the established patterns: Page Objects, Components, and custom Fixtures.

## Project structure reference

```
tests/
├── pages/              — Page Object classes
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── index.ts
├── components/         — Reusable UI components (forms, modals, etc.)
│   ├── LoginForm.ts
│   └── index.ts
└── *.spec.ts           — Test files

fixtures/
├── base.ts             — Merged test fixtures (credentials, page objects, etc.)
├── add_console_to_allure_fixtures.ts
└── add_network_to_allure_fixtures.ts

.env.{ENV}              — Environment variables (BASE_URL, TEST_EMAIL, etc.)
playwright.config.ts    — Playwright configuration
```

## Workflow

### Phase 1: Clarify requirements

Before writing anything, ask the user:

1. **Which page or section** of the site needs test coverage?
2. **What functionality** should be tested?
3. **Are there specific scenarios** the user already has in mind, or should you propose a checklist?

Wait for answers before proceeding. Do not skip this step.

### Phase 2: Explore the page via Playwright MCP

Use Playwright MCP tools to navigate to the actual page and understand its structure:

1. Navigate to the page using `playwright_browser_navigate` with the URL from env config
2. Take a snapshot with `playwright_browser_snapshot` to see the DOM structure
3. Identify interactive elements: buttons, inputs, links, dropdowns, modals
4. Note the `data-testid` attributes or CSS classes that can serve as locators

This exploration helps write accurate locators instead of guessing.

### Phase 3: Propose test cases

Based on the page exploration, present a numbered checklist of test cases to the user.
Each test case should describe:
- What action is performed
- What the expected result is

Wait for the user to approve (fully or partially) before writing code.
If the user wants to add, remove, or modify test cases — adjust the checklist and ask again.

### Phase 4: Write the test code

After approval, create three things:

#### 4a. Component in `tests/components/`

Create `tests/components/<FeatureName>.ts` if the UI element is reusable across pages.
Components encapsulate locators and element-specific actions. They do NOT handle navigation.
Every user-facing action must be wrapped in `test.step()` for Allure reporting.

```ts
import type { Page } from "@playwright/test";
import { test } from "@playwright/test";

export class LoginForm {
	readonly emailInput = this.page.getByTestId("login-email");
	readonly passwordInput = this.page.getByTestId("login-password");
	readonly submitButton = this.page.getByTestId("login-submit");

	constructor(public readonly page: Page) {}

	async authorize_as(email: string, password: string) {
		await test.step("Ввести email", async () => {
			await this.emailInput.fill(email);
		});
		await test.step("Ввести пароль", async () => {
			await this.passwordInput.fill(password);
		});
		await test.step("Нажать Войти", async () => {
			await this.submitButton.click();
		});
	}
}
```

When to create a Component vs just locators in Page Object:
- Component — if the same UI block (form, modal, table) appears on multiple pages
- Page Object locators — if elements are specific to one page only

#### 4b. Page Object in `tests/pages/`

Create `tests/pages/<PageName>.ts`:

```ts
import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class DashboardPage {
	readonly root = this.page.getByTestId("dashboard-v2-page");
	readonly userMenu = this.page.getByTestId("header-user-menu");

	constructor(public readonly page: Page) {}

	async expectVisible() {
		await test.step("Проверить отображение дашборда", async () => {
			await expect(this.root).toBeVisible();
		});
		await test.step("Проверить отображение меню пользователя", async () => {
			await expect(this.userMenu).toBeVisible();
		});
	}
}
```

If the page uses a Component:

```ts
import type { Page } from "@playwright/test";
import { test } from "@playwright/test";
import { LoginForm } from "../components/LoginForm";

export class LoginPage {
	readonly loginForm: LoginForm;

	constructor(public readonly page: Page) {
		this.loginForm = new LoginForm(page);
	}

	async as(email: string, password: string) {
		await test.step("Авторизоваться", async () => {
			await this.loginForm.authorize_as(email, password);
		});
	}
}
```

Key rules:
- No BasePage inheritance — use composition
- `public readonly page: Page` in constructor enables `this.page` in field initializers
- Requires `"useDefineForClassFields": false` in tsconfig.json
- Locators use `getByTestId()` — kebab-case: `login-email`, `submit-button`
- No navigation in Page Objects — that belongs in fixtures

Locator naming conventions:
- Kebab-case for testids: `login-email`, `header-user-menu`, `dashboard-v2-page`
- Element type at the end: `*-button`, `*-input`, `*-link`, `*-modal`

Element naming in code (camelCase):
- Component name + role: `emailInput`, `submitButton`, `passwordInput`
- Not: `inputEmail`, `submitButton` is wrong — it's `submit` + `Button`

#### 4c. Fixture in `fixtures/base.ts`

Register page objects and test data as fixtures:

```ts
import { mergeTests } from "@playwright/test";
import { test as base } from "@playwright/test";
import { LoginPage } from "../tests/pages/LoginPage";
import { DashboardPage } from "../tests/pages/DashboardPage";

type Credentials = {
	email: string;
	password: string;
};

const pageTest = base.extend<{
	loginPage: LoginPage;
	dashboardPage: DashboardPage;
	credentials: Credentials;
}>({
	credentials: async ({}, use) => {
		const email = process.env.TEST_EMAIL;
		const password = process.env.TEST_PASSWORD;
		if (!email || !password) {
			throw new Error("TEST_EMAIL and TEST_PASSWORD env vars are required");
		}
		await use({ email, password });
	},
	loginPage: async ({ page }, use) => {
		await page.goto("/login");
		await use(new LoginPage(page));
	},
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
});

export const test = mergeTests(pageTest);
export { expect } from "@playwright/test";
```

Key rules:
- Navigation (`page.goto`) belongs in fixtures, not in Page Objects
- Env vars validated with explicit error — no `?? ""` fallbacks, no `!` assertions
- Fixtures compose via `mergeTests()` from `@playwright/test`

#### 4d. Write test in `tests/`

Create `tests/<feature>.spec.ts`:

```ts
import { test } from "../fixtures/base";

test("Авторизация — успешный вход по email и паролю", async ({
	loginPage,
	dashboardPage,
	credentials,
}) => {
	await loginPage.as(credentials.email, credentials.password);
	await dashboardPage.expectVisible();
});
```

Test naming: use descriptive names that explain the business scenario, not technical details.
Format: `Feature — expected behavior`. Examples:
- `Авторизация — успешный вход по email и паролю`
- `Каталог — фильтрация товаров по цене`
- `Корзина — добавление товара с выбором количества`

Test conventions:
- Import `test` from `../fixtures/base`, not from `@playwright/test`
- Tests receive page objects and data via fixture destructuring
- No `if/else` in tests
- No `time.sleep()` or `page.waitForTimeout()`
- No `try/except` without good reason
- No comments in code — code must be self-documenting
- Assertions via `expect()` from fixtures

### Allure reporting

Steps are added inside Components and Page Objects, not in tests.
Each `test.step()` describes one user-visible action in Russian.

Rules:
- Steps go in Components and Page Objects — tests stay clean
- Step name = concise business action, no technical details
- One step = one action (fill, click, check)
- Step names in Russian
- Do NOT wrap method calls in `test.step()` if the called method already has steps inside

```ts
// PRAVILNO — step inside Component
async authorize_as(email: string, password: string) {
	await test.step("Ввести email", async () => {
		await this.emailInput.fill(email);
	});
}

// NEVER — step wrapping a method that already has steps
await test.step("Авторизоваться", async () => {
	await this.loginForm.authorize_as(email, password); // authorize_as уже имеет шаги внутри
});
```

Exception: Page Object метод может иметь свой шаг-обёртку, если вызывает Component:
```ts
// DOPUSTIMO — Page Object добавляет свой контекст
async as(email: string, password: string) {
	await test.step("Авторизоваться", async () => {
		await this.loginForm.authorize_as(email, password);
	});
}
```

Step naming dictionary:

| Действие | Формула | Пример |
|----------|---------|--------|
| Ввод текста | Ввести "{значение}" в поле "{название}" | Ввести "ivan@mail.ru" в поле "Email" |
| Клик | Нажать "{название}" | Нажать "Войти" |
| Проверка видимости | Проверить отображение "{название}" | Проверить отображение "Дашборд" |
| Проверка URL | Проверить переход на страницу "{путь}" | Проверить переход на страницу "/dashboard" |
| Выбор опции | Выбрать "{значение}" в "{название}" | Выбрать "Москва" в "Город" |
| Переход | Перейти в "{название}" | Перейти в "Каталог" |

### Phase 5: Validate

After writing the code:
1. Run `npm run typecheck` (or `tsc --noEemit`)
2. Run `npm run lint` and `npm run fmt`
3. Remind the user to run `npm run e2e` to verify tests pass

## Code style

- **Tabs** for indentation
- **Double quotes** for strings
- Biome or ESLint with recommended rules
- No comments in code

## Important notes

- Read existing page objects and components to match the exact code style before writing new ones
- Keep Page Objects focused on one page — don't create mega-classes
- Components are for reusable UI blocks only, not for every element
- If a component is only used on one page, put locators directly in the Page Object
- Environment variables go in `.env.{ENV}` files, loaded via dotenv in playwright.config.ts
