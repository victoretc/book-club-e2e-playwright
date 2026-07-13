---
name: e2e-playwright
description: |
  Write UI E2E tests for any Playwright JS/TS project using @playwright/test, following the
  established Page Object patterns. Use this skill whenever the user asks to write
  e2e tests, create ui autotests, cover a page with playwright tests, write playwright specs,
  or wants to test any web page functionality through automated browser tests. Also trigger when
  the user mentions "автотесты", "ui тесты", "e2e", "playwright тесты", "покрыть тестами страницу",
  or wants to test a specific feature on a site.
---

# E2E Playwright Test Writer

This skill writes UI E2E tests for Playwright JS/TS projects using `@playwright/test`.
It follows the established patterns: Page Objects and custom Fixtures.

## Project structure reference

```
tests/
├── pages/              — Page Object classes
│   ├── SignInPage.ts
│   ├── DashboardPage.ts
│   └── ...
└── *.spec.ts           — Test files

fixtures/
├── api.ts              — API client fixtures (generated clients for setup/teardown)
├── auth.ts             — User registration, authorization, authCode fixtures
├── pages.ts            — Page Object fixtures (extends auth.ts)
├── base.ts             — Merged test fixtures (console + network + pages)
├── add_console_to_allure_fixtures.ts   — Auto-captures console messages for Allure
├── add_network_to_allure_fixtures.ts   — Auto-captures network requests for Allure
└── templates/          — Nunjucks HTML templates for Allure reports

.env.{ENV}              — Environment variables (BASE_URL, API_BASE_URL)
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

#### 4a. Page Object in `tests/pages/`

Create `tests/pages/<PageName>.ts`:

```ts
import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class SignInPage {
	readonly emailInput = this.page.getByTestId("email-input");
	readonly submitButton = this.page.getByTestId("submit-button");

	constructor(public readonly page: Page) {}

	async open() {
		await this.page.goto("/signin");
	}

	async expectEmailStep() {
		await test.step("Проверить отображение шага ввода email", async () => {
			await expect(this.emailInput).toBeVisible();
			await expect(this.submitButton).toBeVisible();
		});
	}

	async fillEmail(email: string) {
		await test.step(`Ввести "${email}" в поле "Электропочта"`, async () => {
			await this.emailInput.fill(email);
		});
	}

	async requestCode() {
		await test.step('Нажать "Получить код"', async () => {
			await this.submitButton.click();
		});
	}
}
```

Key rules:
- No BasePage inheritance — use composition
- `public readonly page: Page` in constructor enables `this.page` in field initializers
- Requires `"useDefineForClassFields": false` in tsconfig.json
- Locators use `getByTestId()`, `getByRole()`, `getByPlaceholder()`, `getByText()` — choose the most semantic one
- Each Page Object has an `open()` method with `page.goto()` for navigation to its page

Locator naming conventions:
- Kebab-case for testids: `login-email`, `header-user-menu`, `dashboard-v2-page`
- Element type at the end: `*-button`, `*-input`, `*-link`, `*-modal`
- Use `getByRole()` for buttons and headings: `getByRole("button", { name: "Войти" })`
- Use `getByPlaceholder()` for inputs with visible placeholder text
- Use `getByText()` for error messages and inline text
- Use `getByTestId()` as primary for testid-based locators

Element naming in code (camelCase):
- Component name + role: `emailInput`, `submitButton`, `passwordInput`
- Not: `inputEmail`, `submitButton` is wrong — it's `submit` + `Button`

#### 4b. Fixtures in `fixtures/`

Fixtures form a chain: `api.ts` → `auth.ts` → `pages.ts` → `base.ts`. Each layer extends the previous one.

**`fixtures/api.ts`** — API clients for setup/teardown:

```ts
import { test as base } from "@playwright/test";
import { Auth } from "../src/api/Auth";
import { Users } from "../src/api/Users";

type Api = {
	auth: Auth;
	users: Users;
};

export const test = base.extend<{ api: Api }>({
	api: async ({ playwright }, use) => {
		const apiRequest = await playwright.request.newContext({
			baseURL: process.env.API_BASE_URL,
		});
		await use({
			auth: new Auth(apiRequest),
			users: new Users(apiRequest),
		});
		await apiRequest.dispose();
	},
});
```

**`fixtures/auth.ts`** — User registration, authorization, auth code retrieval:

```ts
import { faker } from "@faker-js/faker";
import { test as apiTest } from "./api";

type RegisteredUser = {
	id: number;
	email: string;
	username: string;
	access: string;
	refresh: string;
};

type AuthCode = {
	retrieve: (email: string) => Promise<string>;
};

export const test = apiTest.extend<{
	registeredUser: RegisteredUser;
	authorizedUser: RegisteredUser;
	authCode: AuthCode;
}>({
	registeredUser: async ({ api }, use) => {
		const email = faker.internet.email();
		const { code } = await api.auth.authCodeCreate({ email });
		const { code: retrievedCode } = await api.auth.authCodeRetrieveCreate({ email });
		const { access, refresh } = await api.auth.authCodeVerifyCreate({
			email,
			code: retrievedCode,
		});
		const { id } = await api.users.usersMeRetrieve({
			headers: { Authorization: `Bearer ${access}` },
		});
		const user = { id, email, username: email, access, refresh };
		await use(user);
		await api.users.usersMeDestroy({
			headers: { Authorization: `Bearer ${access}` },
		});
	},
	authorizedUser: async ({ registeredUser, page }, use) => {
		await page.addInitScript(
			({ id, email, access, refresh }) => {
				localStorage.setItem(
					"book_club_auth",
					JSON.stringify({
						user: { id, username: email, firstName: "", lastName: "", email },
						accessToken: access,
						refreshToken: refresh,
					}),
				);
			},
			{
				id: registeredUser.id,
				email: registeredUser.email,
				access: registeredUser.access,
				refresh: registeredUser.refresh,
			},
		);
		await use(registeredUser);
	},
	authCode: async ({ api }, use) => {
		await use({
			retrieve: async (email: string) => {
				const { code } = await api.auth.authCodeRetrieveCreate({ email });
				return code;
			},
		});
	},
});
```

**`fixtures/pages.ts`** — Page Objects:

```ts
import { test as authTest } from "./auth";
import { SignInPage } from "../tests/pages/SignInPage";
import { DashboardPage } from "../tests/pages/DashboardPage";

export const test = authTest.extend<{
	signInPage: SignInPage;
	dashboardPage: DashboardPage;
}>({
	signInPage: async ({ page }, use) => {
		await use(new SignInPage(page));
	},
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
});
```

**`fixtures/base.ts`** — Merge everything + auto-fixtures for Allure:

```ts
import { mergeTests } from "@playwright/test";
import { test as consoleTest } from "./add_console_to_allure_fixtures";
import { test as networkTest } from "./add_network_to_allure_fixtures";
import { test as pagesTest } from "./pages";

export const test = mergeTests(consoleTest, networkTest, pagesTest);
export { expect } from "@playwright/test";
```

Key rules:
- Fixtures compose via `mergeTests()` from `@playwright/test`
- Each fixture file extends the previous layer — never skip a layer
- Env vars validated with explicit error — no `?? ""` fallbacks, no `!` assertions
- API clients created via `playwright.request.newContext()`, disposed after use
- Auth setup/teardown happens via API (register in setup, delete in teardown)
- `authorizedUser` injects auth into `localStorage` via `addInitScript()` — no UI login needed

#### 4c. Write test in `tests/`

Create `tests/<feature>.spec.ts`:

```ts
import { faker } from "@faker-js/faker";
import { test } from "../fixtures/base";

test("Создать клуб", async ({ authorizedUser, createClubPage, dashboardPage }) => {
	const bookTitle = faker.book.title();

	await createClubPage.open();
	await createClubPage.expectVisible();

	await createClubPage.fillForm({
		bookTitle,
		bookAuthors: faker.person.fullName(),
		publicationYear: faker.number.int({ min: 1900, max: 2025 }),
		description: faker.lorem.sentence(),
		telegramChatLink: `https://t.me/${faker.internet.username()}`,
	});
	await createClubPage.submit();
	await dashboardPage.searchClub(bookTitle);
	await dashboardPage.expectClubVisible(bookTitle);
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
- Use `@faker-js/faker` for test data generation (emails, names, titles, numbers, URLs)
- No `if/else` in tests
- No `time.sleep()` or `page.waitForTimeout()`
- No `try/except` without good reason
- No comments in code — code must be self-documenting
- Assertions via `expect()` from fixtures

### Allure reporting

Steps are added inside Page Objects, not in tests.
Each `test.step()` describes one user-visible action in Russian.

Rules:
- Steps go in Page Objects — tests stay clean
- Step name = concise business action, no technical details
- One step = one action (fill, click, check)
- Step names in Russian
- Do NOT wrap method calls in `test.step()` if the called method already has steps inside

```ts
// PRAVILNO — step inside Page Object
async fillEmail(email: string) {
	await test.step(`Ввести "${email}" в поле "Электропочта"`, async () => {
		await this.emailInput.fill(email);
	});
}

// NEVER — step wrapping a method that already has steps
await test.step("Заполнить email", async () => {
	await this.signInPage.fillEmail(email); // fillEmail уже имеет шаг внутри
});
```

Exception: Page Object method can have its own step wrapper if it composes other Page Objects:
```ts
// DOPUSTIMO — Page Object добавляет свой контекст
async searchClub(title: string) {
	await test.step("Найти клуб в поиске", async () => {
		await this.searchInput.fill(title);
		await this.searchButton.click();
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

### Console and Network Allure fixtures

Two auto-fixtures capture browser data and attach HTML reports to Allure:

- `consoleCapture` — captures all console messages, checks for unexpected errors
- `networkCapture` — captures all network responses, attaches request/response details

Both are auto-enabled (no need to request them in tests).

**Suppressing expected console errors:**

Some tests intentionally trigger console errors (e.g., failed API calls). Use annotations to whitelist specific error patterns:

```ts
test("Авторизация — неверный код", async ({ signInPage }) => {
	test.info().annotations.push({
		type: "consoleErrorExceptions",
		description: JSON.stringify([
			"Failed to load resource: the server responded with a status of 400",
		]),
	});
	// ... test code
});
```

The annotation value is a JSON array of regex patterns. Errors matching any pattern are ignored.

### Test data with @faker-js/faker

Use `@faker-js/faker` for generating realistic test data. Import it at the top of the spec file:

```ts
import { faker } from "@faker-js/faker";
```

Common methods:
- `faker.internet.email()` — random email
- `faker.person.fullName()` — random name
- `faker.book.title()` — random book title
- `faker.number.int({ min, max })` — random integer in range
- `faker.lorem.sentence()` — random sentence
- `faker.internet.username()` — random username

### Phase 5: Validate

After writing the code:
1. Run `npm run typecheck` (or `tsc --noEmit`)
2. Run `npm run lint` and `npm run fmt`
3. Remind the user to run `npm run e2e` to verify tests pass

## Code style

- **Tabs** for indentation
- **Double quotes** for strings
- Biome with recommended rules
- No comments in code

## Important notes

- Read existing page objects to match the exact code style before writing new ones
- Keep Page Objects focused on one page — don't create mega-classes
- If a UI block is only used on one page, put locators directly in the Page Object
- Environment variables go in `.env.{ENV}` files, loaded via dotenv in playwright.config.ts
- Test users are created and cleaned up via API — never rely on pre-existing test data
