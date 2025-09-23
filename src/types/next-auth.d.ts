import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {

		accessToken?: string;
		user: {

			role?: string;
			id: string
			address?: string;
		} & DefaultSession["user"];
	}

	interface User {
		id: string
		token: string;
		role: string;
	}

	interface JWT {
		id: string
		token?: string;
		role?: string;
	}
}
