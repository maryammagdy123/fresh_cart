import { LoginNextAuth } from "@/services/api"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "Email", type: "text", placeholder: "ur-email@gmail.com" },
				password: { label: "Password", type: "password", placeholder: "***********" }
			},
			async authorize(credentials, req) {
				const res = await LoginNextAuth(credentials?.email ?? "", credentials?.password ?? "")
				console.log("next auth response ", res)

				// id is required => unique

				if (res.message === "success") {
					const user = {
						id: res.user.email,
						name: res.user.name,
						email: res.user.email,
						role: res.user.role,
						token: res.token
					}
					return user
				} else {
					return null
				}
			}
		})
	],
	pages: {
		signIn: "/auth/login"
	}
	,
	callbacks: {
		async session({ session, user, token }) {
			session.user.role = token.role as string;
			session.accessToken = user.role;
			return session
		},
		async jwt({ token, user }) {
			token.accessToken = user.token
			return token
		}
	}

})

export { handler as GET, handler as POST }