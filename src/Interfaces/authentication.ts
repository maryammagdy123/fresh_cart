export interface AuthRespons {
	message: string;
	user: User;
	token: string;
}

export interface User {
	name: string;
	email: string;
	role: "user" | "admin" | string;
}