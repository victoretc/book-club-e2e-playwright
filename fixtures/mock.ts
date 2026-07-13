import { test as base } from "@playwright/test";
import { Mock } from "../utils/mock";

export const test = base.extend<{ mock: Mock }>({
	mock: async ({ page }, use) => {
		await use(new Mock(page));
	},
});
