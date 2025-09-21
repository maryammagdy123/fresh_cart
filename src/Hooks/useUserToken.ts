"use client";
import { useSession } from "next-auth/react";

export function useUserToken() {

	const { data: session, status } = useSession();

	const getHeaders = () => {
		if (status !== "authenticated") return { "Content-Type": "application/json" };

		return {
			"Content-Type": "application/json",
			Authorization: session.accessToken,
		};
	};

	return getHeaders;
}
