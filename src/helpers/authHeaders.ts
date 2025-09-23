"use server"

import { getServerSession } from "next-auth";


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
		token: session?.accessToken
	};
}
