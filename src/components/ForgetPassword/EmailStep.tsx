"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, EmailFormValues } from "@/schemas/forgetPassword";

interface EmailStepProps {
	onSubmit: (values: EmailFormValues) => void;
	loading: boolean;
}


export default function EmailStep({ onSubmit, loading }: EmailStepProps) {
	const form = useForm<EmailFormValues>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: "" },
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="email"
									placeholder="Enter your email"
									className="border-gray-300 focus:border-black focus:ring-black"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" variant="contained" disabled={loading}>
					Next
				</Button>
			</form>
		</Form>
	);
}
