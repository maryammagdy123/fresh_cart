"use client";
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginFormValues, loginSchema } from "@/schemas/login";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";


export default function LoginForm() {
	const inputs = [
		{ name: "email", formLabel: "Email", inputType: "email" },
		{ name: "password", formLabel: "Password", inputType: "password" },
	]; const router = useRouter();
	const searchParams = useSearchParams()
	const callabackUrl = searchParams.get("callabackUrl") || "/products"
	const [isLogin, setIslogin] = useState(false)
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginFormValues) => {
		setIslogin(true)
		try {
			const response = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false
			});
			if (response?.ok) {
				toast.success("Loged in successfully")
				router.push(callabackUrl)
			}
		} catch (error) {
			console.log(error)
		}
		setIslogin(false)
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				{inputs.map((item, index) => (
					<FormField
						key={index}
						control={form.control}
						name={item.name as keyof LoginFormValues}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700">
									{item.formLabel}
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type={item.inputType}
										placeholder={`Enter your ${item.name}`}
										className=" border-gray-300 focus:border-black focus:ring-black"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				<Button
					type="submit"
					disabled={isLogin}
					className="w-full mt-2  bg-black hover:bg-gray-800 text-white"
				>
					{
						isLogin && (<Loader2 className="animate-spin" />)
					}
					Login
				</Button>
			</form>
		</Form>
	)
}
