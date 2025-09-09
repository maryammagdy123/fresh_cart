
import { apiServices } from "@/services/api"
import React, { Suspense } from "react"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { GetCartResponse } from "@/Interfaces"
import InnerCart from "@/components/Cart/InnerCart"

export default async function Cart() {


	async function handleDisplayCart() {
		const response: GetCartResponse = await apiServices.getUserCart()
		return response;
	}
	const cartData = await handleDisplayCart();





	return (
		<Suspense fallback={<LoadingSpinner />}>
			<section className="p-7 max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
				{/* Cart */}
				<InnerCart cartData={cartData} />
			</section>
		</Suspense>
	)
}
