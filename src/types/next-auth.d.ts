import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		/** الـ Access Token الخاص بالـ API */
		accessToken?: string; // 👈 خليه Optional علشان ما يطلعش Error قبل الـ Login
		user: {
			/** Role اليوزر */
			role?: string;
			/** أي فيلدز زيادة */
			address?: string;
		} & DefaultSession["user"];
	}

	interface User {
		/** التوكن الراجع من الـ API */
		token: string;
		role: string;
	}

	interface JWT {
		/** نضيف التوكن في الـ JWT عشان نقدر نمرره للـ Session */
		token?: string;
		role?: string;
	}
}
