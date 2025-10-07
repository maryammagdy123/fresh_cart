"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CheckoutFormValues, CheckoutSchema } from '@/schemas/checkout'
import { zodResolver } from '@hookform/resolvers/zod'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import { Form } from "@/components/ui/form";
import { checkoutOrder } from '@/services/api'

interface CheckoutFormProps {
	cartID: string
}
export default function CheckoutForm({ cartID }: CheckoutFormProps) {
	const inputs = [
		{ formLabel: "Details", inputType: "text", id: "details", name: "details" },
		{ formLabel: "phone", inputType: "text", id: "phone", name: "phone" },
		{ formLabel: "City", inputType: "text", id: "city", name: "city" },
	]
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(CheckoutSchema),
		defaultValues: {
			details: "",
			phone: "",
			city: ""
		},
	});
	const [isSubmiting, setIsSubmiting] = useState(false)

	const onSubmit = async (values: CheckoutFormValues) => {
		setIsSubmiting(true)
		console.log(cartID, "cart id")
		try {
			const response = await checkoutOrder(cartID, values);
			console.log(response)
			if (response.status === "success") {
				window.open(response.session?.url, "_self")
			}
		} catch (error) {
			console.log(error)
		}
		setIsSubmiting(false)
	};
	return (
		< Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				{inputs.map((item, index) => (
					<FormField
						key={index}
						control={form.control}
						name={item.name as keyof CheckoutFormValues}
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
					disabled={isSubmiting}
					className="w-full mt-2  bg-black hover:bg-gray-800 text-white"
				>
					{
						isSubmiting && <Loader2 className='animate-spin' />
					}
					Check out
				</Button>
			</form>
		</Form >
	)
}
