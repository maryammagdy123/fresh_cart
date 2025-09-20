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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginFormValues, loginSchema } from "@/schemas/login";
import toast from "react-hot-toast";




const inputs = [
	{ name: "email", formLabel: "Email", inputType: "email" },
	{ name: "password", formLabel: "Password", inputType: "password" },
];

export default function LoginPage() {
	const router = useRouter();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginFormValues) => {
		try {
			const response = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false
			});
			if (response?.ok) {
				toast.success("Loged in successfully")
				router.push("/products")
			}
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
				{/* Header */}
				<h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
					Welcome Back
				</h1>
				<p className="text-gray-500 text-center mb-8">
					Login to continue shopping and explore your favourite products
				</p>

				{/* Form */}
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
							className="w-full mt-2  bg-black hover:bg-gray-800 text-white"
						>
							Login
						</Button>
					</form>
				</Form>

				{/* Footer */}
				<div className="flex justify-between items-center mt-6 text-sm">
					<Link
						href="/forgotpassword"
						className="text-blue-600 hover:underline hover:text-blue-800"
					>
						Forgot Password?
					</Link>

					<p className="text-gray-500">
						Don&apos;t have an account?{" "}
						<Link
							href="/register"
							className="text-blue-600 hover:underline hover:text-blue-800"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
