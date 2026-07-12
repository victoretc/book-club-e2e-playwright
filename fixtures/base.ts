import { mergeTests } from "@playwright/test";
import { test as consoleTest } from "./add_console_to_allure_fixtures";
import { test as networkTest } from "./add_network_to_allure_fixtures";
import { test as pagesTest } from "./pages";

export const test = mergeTests(consoleTest, networkTest, pagesTest);
export { expect } from "@playwright/test";
