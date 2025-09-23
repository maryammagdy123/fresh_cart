import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });

	if (token?.accessToken) {
		return NextResponse.next();
	}

	const loginUrl = new URL("/auth/login", request.url); // 
	loginUrl.searchParams.set(
		"callbackUrl",
		request.nextUrl.pathname + request.nextUrl.search
	);

	return NextResponse.redirect(loginUrl);
}

export const config = {
	matcher: ["/cart", "/allorders", "/wishlist"],
};
