export interface AuthResponse {
	message: string;
	user: User;
	token: string;
}

export interface User {
	name: string;
	email: string;
	role: "user" | "admin" | string;
}

export interface ForgetPasswordResponse {
	statusMsg: string;
	message: string;
}

export interface CodeRes {
	status: string
}

export interface NewPassword {
	token: string
}