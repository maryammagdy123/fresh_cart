import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {

		accessToken?: string;
		user: {

			role?: string;

			address?: string;
		} & DefaultSession["user"];
	}

	interface User {

		token: string;
		role: string;
	}

	interface JWT {

		token?: string;
		role?: string;
	}
}
