import z from "zod";

export const CheckoutSchema = z.object({
	details: z.string().nonempty("Required"),
	city: z.string().nonempty("City can not be empty"),
	phone: z
		.string()
		.regex(/^(010|011|012|015)[0-9]{8}$/, "Enter a valid phone number")
});


export type CheckoutFormValues = z.infer<typeof CheckoutSchema>;