import { test as base } from "@playwright/test";
import { Auth } from "../src/api/Auth";
import { Clubs } from "../src/api/Clubs";
import { Users } from "../src/api/Users";

type Api = {
	auth: Auth;
	users: Users;
	clubs: Clubs;
};

export const test = base.extend<{ api: Api }>({
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
});
