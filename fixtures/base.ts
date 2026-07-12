import { faker } from "@faker-js/faker";
import { test as base, mergeTests } from "@playwright/test";
import { Auth } from "../src/api/Auth";
import { Clubs } from "../src/api/Clubs";
import { Users } from "../src/api/Users";
import { CreateClubPage } from "../tests/pages/CreateClubPage";
import { DashboardPage } from "../tests/pages/DashboardPage";
import { test as consoleTest } from "./add_console_to_allure_fixtures";
import { test as networkTest } from "./add_network_to_allure_fixtures";

type Api = {
	auth: Auth;
	users: Users;
	clubs: Clubs;
};

type RegisteredUser = {
	id: number;
	email: string;
	username: string;
	access: string;
	refresh: string;
};

type AuthorizedUser = RegisteredUser;

const pageTest = base.extend<{
	api: Api;
	registeredUser: RegisteredUser;
	authorizedUser: AuthorizedUser;
	createClubPage: CreateClubPage;
	dashboardPage: DashboardPage;
}>({
	api: async ({ playwright }, use) => {
		const apiRequest = await playwright.request.newContext({
			baseURL: process.env.API_BASE_URL,
		});
		await use({
			auth: new Auth(apiRequest),
			users: new Users(apiRequest),
			clubs: new Clubs(apiRequest),
		});
		await apiRequest.dispose();
	},
	registeredUser: async ({ api }, use) => {
		const email = faker.internet.email();
		const username = email;

		await api.auth.authCodeCreate({ email });

		const { code } = await api.auth.authCodeRetrieveCreate({ email });
		const { access, refresh } = await api.auth.authCodeVerifyCreate({
			email,
			code,
		});

		const { id } = await api.users.usersMeRetrieve({
			headers: { Authorization: `Bearer ${access}` },
		});

		const user = { id, email, username, access, refresh };
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
						user: {
							id,
							username: email,
							firstName: "",
							lastName: "",
							email,
						},
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
	createClubPage: async ({ authorizedUser, page }, use) => {
		await page.goto("/clubs/create");
		await use(new CreateClubPage(page));
	},
	dashboardPage: async ({ authorizedUser, page }, use) => {
		await use(new DashboardPage(page));
	},
});

export const test = mergeTests(consoleTest, networkTest, pageTest);
export { expect } from "@playwright/test";
