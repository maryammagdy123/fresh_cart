"use server"
import { getUserToken } from "@/helpers/getUserToken";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

export async function authHeaders() {
	const session = await getServerSession();

	if (!session?.accessToken) {
		console.log("No token")
	}
	else {
		console.log("ok")
	}

	return {
		"Content-Type": "application/json",
		token: session?.accessToken   // 👈 مش Bearer
	};
}
