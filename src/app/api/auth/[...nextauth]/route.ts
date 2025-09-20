import { LoginNextAuth } from "@/services/api"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "ur-email@gmail.com" },
				password: { label: "Password", type: "password", placeholder: "***********" }
			},
			async authorize(credentials) {
				const res = await LoginNextAuth(
					credentials?.email ?? "",
					credentials?.password ?? ""
				)

				console.log("next auth response ", res)

				if (res.message === "success") {
					return {
						id: res.user.email,   // 👈 لازم ID فريد
						name: res.user.name,
						email: res.user.email,
						role: res.user.role,
						token: res.token
					}
				}
				return null
			}
		})
	],

	pages: {
		signIn: "/auth/login"
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.token
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			session.user.role = token.role as string
			session.accessToken = token.accessToken as string
			return session
		}
	},

	secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
