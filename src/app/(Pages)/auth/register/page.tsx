"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { PasswordChecklist } from "@/components/Form/PasswordCheckList";
import { SignUp } from "@/services/api";
import { useRouter } from "next/navigation";



const inputs = [
	{ name: "name", formLabel: "Name", inputType: "text" },
	{ name: "email", formLabel: "Email", inputType: "email" },
	{ name: "phone", formLabel: "Phone", inputType: "text" },
];

export default function RegisterPage() {
	const navigate = useRouter()
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			rePassword: "",
			phone: "",
		},
	});



	// Watch password
	const password = form.watch("password");

	const onSubmit = async (values: RegisterFormValues) => {
		try {
			const registerRes = await SignUp(values);

			if (registerRes.message === "success") {
				console.log(registerRes);
				toast.success("Registered successfully!");
				console.log("Form Values:", values);
				form.reset();
				navigate.push("/login");
			} else {
				toast.error(registerRes.message || "Registration failed. Please try again.");
			}

		} catch (error) {
			console.error("Registration error:", error);
			toast.error("Something went wrong. Please try again later.");

		}
	};



	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
				<h1 className="text-2xl font-bold mb-1 text-center">Register</h1>
				<p className="text-gray-400 mb-6 text-center">Register now to browse our products</p>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Inputs*/}
						{inputs.map((item, index) => (
							<FormField
								key={index}
								control={form.control}
								name={item.name as keyof RegisterFormValues}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{item.formLabel}</FormLabel>
										<FormControl>
											<Input {...field} type={item.inputType} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}

						{/*Password and check List*/}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									<FormMessage />
									<PasswordChecklist password={password} />
								</FormItem>
							)}
						/>

						{/* Confırm Password*/}
						<FormField
							control={form.control}
							name="rePassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
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
			</div>
		</div>
	);
}
