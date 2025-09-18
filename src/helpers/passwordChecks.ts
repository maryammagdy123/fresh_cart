
export type PasswordCheck = {
	label: string;
	test: (pw: string) => boolean;
};

export const passwordChecks: PasswordCheck[] = [
	{ label: "At least 8 characters", test: (pw) => pw.length >= 8 },
	{ label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
	{ label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
	{ label: "One number", test: (pw) => /\d/.test(pw) },
	{ label: "One special character (!@#$%^&*)", test: (pw) => /[!@#$%^&*]/.test(pw) },
];
