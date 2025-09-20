import { getUserToken } from "@/helpers/getUserToken";

export async function authHeaders(): Promise<Record<string, string>> {
	const token: any = await getUserToken();
	if (!token) throw new Error("No token");

	return {
		"Content-Type": "application/json",
		token: token
	};
}
