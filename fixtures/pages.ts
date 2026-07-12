import { test as authTest } from "./auth";
import { CreateClubPage } from "../tests/pages/CreateClubPage";
import { DashboardPage } from "../tests/pages/DashboardPage";
import { ProfilePage } from "../tests/pages/ProfilePage";
import { SignInPage } from "../tests/pages/SignInPage";

export const test = authTest.extend<{
	createClubPage: CreateClubPage;
	dashboardPage: DashboardPage;
	signInPage: SignInPage;
	profilePage: ProfilePage;
}>({
	createClubPage: async ({ page }, use) => {
		await use(new CreateClubPage(page));
	},
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
	signInPage: async ({ page }, use) => {
		await use(new SignInPage(page));
	},
	profilePage: async ({ page }, use) => {
		await use(new ProfilePage(page));
	},
});
