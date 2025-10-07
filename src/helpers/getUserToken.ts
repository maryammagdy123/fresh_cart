import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import jwt from "jsonwebtoken";





// --------------------
// Caching variables
// --------------------
// These variables store the access token and user ID in memory
// to avoid decoding or fetching the cookie multiple times unnecessarily.
let cachedAccessToken: string | null = null;
let cachedUserId: string | null = null;


// --------------------
// Function: getToken()
// --------------------
// This function retrieves the access token from NextAuth cookies.
// It first checks if the token is cached; if not, it reads it from cookies
// and decodes it using the NextAuth secret.
export async function getToken(): Promise<string | null> {

	if (cachedAccessToken) return cachedAccessToken; // Return cached token if available

	const cookieStore = cookies();

	// Try to get the session token from either of the possible cookie names
	const token =
		(await cookieStore).get("__Secure-next-auth.session-token")?.value ??
		(await cookieStore).get("next-auth.session-token")?.value;

	if (!token) return null; // If no token found, return null

	// Decode the session token using NextAuth's secret key
	const session = await decode({
		token,
		secret: process.env.NEXTAUTH_SECRET!,
	});

	// Extract the accessToken if it exists and is a string
	const accessToken =
		typeof session?.accessToken === "string" ? session.accessToken : null;

	// Cache the token to reuse it later
	cachedAccessToken = accessToken;

	return accessToken;
}


// --------------------
// Function: userId()
// --------------------
// This function retrieves the user's ID from the decoded JWT access token.
// It caches the user ID after decoding to avoid reprocessing.
export async function userId(): Promise<string | null> {

	if (cachedUserId) return cachedUserId; // Return cached user ID if available

	const accessToken = await getToken();
	if (!accessToken) return null; // No access token means no user ID

	try {
		// Decode the JWT token to extract the user ID
		const decoded = jwt.decode(accessToken) as { id?: string } | null;
		const id = decoded?.id ?? null;

		// Cache the user ID for later use
		cachedUserId = id;

		return id;
	} catch (error) {
		console.error("JWT TOKEN FAILED", error);
		return null; // In case of an invalid token or decode error
	}
}



// THIS CODE WAS OCCURING SLOWNESS

// export async function getToken() {
// 	const cookieStore = cookies();

// 	const raw = (await cookieStore).get("__Secure-next-auth.session-token")?.value
// 		?? (await cookieStore).get("next-auth.session-token")?.value;

// 	if (!raw) return null;

// 	const decoded = await decode({
// 		token: raw,
// 		secret: process.env.NEXTAUTH_SECRET!,
// 	});
// 	return decoded?.accessToken ?? null;
// }

// export async function userId() {


// 	const decoded = await getToken()

// 	if (decoded && typeof decoded === "string") {
// 		const inner = jwt.decode(decoded) as { id?: string };
// 		console.log(inner)
// 		return inner?.id ?? null;

// 	}

// 	return null;
// }


