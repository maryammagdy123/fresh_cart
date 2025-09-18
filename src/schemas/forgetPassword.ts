
import * as z from "zod";

export const emailSchema = z.object({
	email: z.string().email(" Invalid email address"),
});

export const codeSchema = z.object({
	resetCode: z.string()
		.regex(/^\d+$/, " Code must contain only numbers")
		.min(1, " Code is required"),
});

export const passwordSchema = z.object({
	newPassword: z
		.string()
		.min(8, " At least 8 characters")
		.regex(/[A-Z]/, " Must include uppercase")
		.regex(/[a-z]/, " Must include lowercase")
		.regex(/\d/, " Must include a number"),
	email: z.string().email(" Invalid email address"),
});

export type EmailFormValues = z.infer<typeof emailSchema>;
export type CodeFormValues = z.infer<typeof codeSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
