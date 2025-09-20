import z from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Must include an uppercase letter")
		.regex(/[a-z]/, "Must include a lowercase letter")
		.regex(/\d/, "Must include a number")
		.regex(/[!@#$%^&*]/, "Must include a special character"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;