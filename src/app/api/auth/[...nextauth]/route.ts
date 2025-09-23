import { LoginNextAuth } from "@/services/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "ur-email@gmail.com" },
				password: { label: "Password", type: "password", placeholder: "***********" },
			},
			async authorize(credentials) {
				const res = await LoginNextAuth(
					credentials?.email ?? "",
					credentials?.password ?? ""
				);

				console.log("next auth response ", res);

				if (res.message === "success") {
					return {
						id: res.user.email,
						name: res.user.name,
						email: res.user.email,
						role: res.user.role,
						token: res.token,
					};
				}
				return null;
			},
		}),
	],

	pages: {
		signIn: "/auth/login",
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.token;
				token.role = user.role;
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.role = token.role as string;
			session.accessToken = token.accessToken as string;
			session.user.id = token.id as string;
			return session;
		},
	},


	secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
