import z from "zod";
export const registerSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Must include an uppercase letter")
			.regex(/[a-z]/, "Must include a lowercase letter")
			.regex(/\d/, "Must include a number")
			.regex(/[!@#$%^&*]/, "Must include a special character"),
		rePassword: z.string().min(6, "Confirm your password"),
		phone: z
			.string()
			.regex(/^(010|011|012|015)[0-9]{8}$/, "Enter a valid phone number")
	})
	.refine((data) => data.password === data.rePassword, {
		message: "Passwords do not match",
		path: ["rePassword"],
	});

export type RegisterFormValues = z.infer<typeof registerSchema>;