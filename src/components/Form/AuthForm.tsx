"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/(Pages)/register/page";
import * as z from "zod";

type RegisterFormValues = z.infer<typeof registerSchema>;
interface AuthFormPreops {
	Schema: z.ZodObject<{}, z.core.$strip>,
	onSubmit: (values: {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}) => void
}




export default function AuthForm({ Schema, onSubmit }: AuthFormPreops) {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	return (

		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input type="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>

							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>

							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Confirm Password */}
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>

							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full mt-2">
					Register
				</Button>
			</form>
		</Form>
	)
}
