import Image from "next/image"
import { apiServices } from "@/services/api"
import React, { Suspense } from "react"
import CartSummary from "@/components/Cart/CartSummary"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import CartList from "@/components/Cart/CartList"
import { GetCartResponse } from "@/Interfaces"
import { Product } from "@/Interfaces/cart"
import dynamic from "next/dynamic"

export default async function Cart() {


	const data: GetCartResponse = await apiServices.getUserCart()
	const cartProducts = data.data.products


	return (
		<Suspense fallback={<LoadingSpinner />}>
			<section className="p-6 max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* products list */}
					<div className="lg:col-span-2 space-y-4">

						{
							cartProducts.map((item) =>
								<CartList key={item._id} cartProducts={cartProducts} />
							)
						}
					</div>

					{/* summary box */}
					<CartSummary />
				</div>
			</section>
		</Suspense>
	)
}
