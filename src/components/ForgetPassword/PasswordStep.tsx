"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFormValues, passwordSchema } from "@/schemas/forgetPassword";

interface PasswordStepProps {
	onSubmit: (values: PasswordFormValues) => void;
	loading: boolean;
	onBack: () => void
}


export default function PasswordStep({ onSubmit, loading, onBack }: PasswordStepProps) {
	const form = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { email: "", newPassword: "" },
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

				<FormField

					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">
								Email
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									placeholder={`Enter Eamail`}
									className=" border-gray-300 focus:border-black focus:ring-black"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField

					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">
								New Password
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="password"
									placeholder={`Enter Password`}
									className=" border-gray-300 focus:border-black focus:ring-black"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>


				<Box mt={3} display="flex" justifyContent="space-between">
					<Button onClick={onBack} variant="outlined" disabled={loading}>
						Back
					</Button>
					<Button type="submit" variant="contained" disabled={loading}>
						Finish
					</Button>
				</Box>
			</form>
		</Form>
	);
}
