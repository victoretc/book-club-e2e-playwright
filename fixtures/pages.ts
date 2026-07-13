import { test as authTest } from "./auth";
import { ClubDetailPage } from "../tests/pages/ClubDetailPage";
import { CreateClubPage } from "../tests/pages/CreateClubPage";
import { DashboardPage } from "../tests/pages/DashboardPage";
import { ProfilePage } from "../tests/pages/ProfilePage";
import { SignInPage } from "../tests/pages/SignInPage";

export const test = authTest.extend<{
	clubDetailPage: ClubDetailPage;
	createClubPage: CreateClubPage;
	dashboardPage: DashboardPage;
	signInPage: SignInPage;
	profilePage: ProfilePage;
}>({
	clubDetailPage: async ({ page }, use) => {
		await use(new ClubDetailPage(page));
	},
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
