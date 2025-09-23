import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function getToken() {
	const cookieStore = cookies();

	const raw = (await cookieStore).get("__Secure-next-auth.session-token")?.value
		?? (await cookieStore).get("next-auth.session-token")?.value;

	if (!raw) return null;

	const decoded = await decode({
		token: raw,
		secret: process.env.NEXTAUTH_SECRET!,
	});
	return decoded?.accessToken ?? null;
}

export async function userId() {


	const decoded = await getToken()

	if (decoded && typeof decoded === "string") {
		const inner = jwt.decode(decoded) as { id?: string };
		console.log(inner)
		return inner?.id ?? null;

	}

	return null;
}


