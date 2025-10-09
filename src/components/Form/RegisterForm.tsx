"use client"
import { RegisterFormValues, registerSchema } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { PasswordChecklist } from './PasswordCheckList';
import { Button } from '../ui/button';
import { SignUp } from '@/services/api';
import toast from 'react-hot-toast';

export default function RegisterForm() {

	const inputs = [
		{ name: "name", formLabel: "Name", inputType: "text" },
		{ name: "email", formLabel: "Email", inputType: "email" },
		{ name: "phone", formLabel: "Phone", inputType: "text" },
	];
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
	)
}
