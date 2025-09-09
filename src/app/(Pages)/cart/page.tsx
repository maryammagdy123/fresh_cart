
import { apiServices } from "@/services/api"
import React, { Suspense } from "react"
import CartSummary from "@/components/Cart/CartSummary"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { GetCartResponse } from "@/Interfaces"
import EmptyCart from "@/components/Cart/EmptyCart"
import CartList from "@/components/Cart/CartList"

export default async function Cart() {


	const data: GetCartResponse = await apiServices.getUserCart()
	const cartProducts = data.data.products
	const total = data.data.totalCartPrice
	const numOfCartItems = data.numOfCartItems


	if (cartProducts.length == 0) {
		return <EmptyCart />
	}

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<section className="p-7 max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* products list */}
					<div className="lg:col-span-2  space-y-4">

						{
							cartProducts.map((item) =>
								<CartList key={item._id} cartItem={item} />
							)
						}
					</div>

					{/* summary box */}
					<CartSummary totalprice={total} />
				</div>
			</section>
		</Suspense>
	)
}
