

import { useSession } from "next-auth/react";

export function useToken() {

	const { data: session } = useSession();
	const token = session?.accessToken
	function getHeaders() {
		return {
			"Content-Type": "application/json",
			token: token
		};
	}
	return getHeaders()
}