"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { codeSchema, CodeFormValues } from "@/schemas/forgetPassword";

interface CodeStepProps {
	onSubmit: (values: CodeFormValues) => void;
	onBack: () => void;
	loading: boolean;
}

/**
 * 🟠 الخطوة الثانية: إدخال كود التحقق
 */
export default function CodeStep({ onSubmit, onBack, loading }: CodeStepProps) {
	const form = useForm<CodeFormValues>({
		resolver: zodResolver(codeSchema),
		defaultValues: { resetCode: "" },
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormField
					control={form.control}
					name="resetCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Verification Code</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									placeholder="Enter code"
									className="border-gray-300 focus:border-black focus:ring-black"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-between gap-3 pt-2">
					<Button onClick={onBack} variant="outlined" disabled={loading}>
						Back
					</Button>
					<Button type="submit" variant="contained" disabled={loading}>
						Next
					</Button>
				</div>
			</form>
		</Form>
	);
}
