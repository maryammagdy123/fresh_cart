import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request })
	if (token?.token) {
		NextResponse.next()
	} else {
		const LoginUrl = new URL(`auth/login`, request.url)
		LoginUrl.searchParams.set(`callbackUrl`, request.nextUrl.pathname + request.nextUrl.search)
		return NextResponse.redirect(LoginUrl)
	}
}


export const config = {
	matcher: '/cart',
}