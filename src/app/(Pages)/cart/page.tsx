
import { apiServices } from "@/services/api"
import React, { Suspense } from "react"
import CartSummary from "@/components/Cart/CartSummary"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { GetCartResponse } from "@/Interfaces"
import EmptyCart from "@/components/Cart/EmptyCart"
import CartList from "@/components/Cart/CartList"

export default async function Cart() {


	async function handleDisplayCart() {
		const response: GetCartResponse = await apiServices.getUserCart()
		return response;
	}
	const response = await handleDisplayCart();
	const cartProducts = response.data.products
	const totalprice = response.data.totalCartPrice

	if (cartProducts.length == 0) {
		return <EmptyCart />
	}

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<section className="p-7 max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>

				<p className="text-gray-500 mb-4">You have {response.numOfCartItems} {response.numOfCartItems == 1 ? "item" : "items"} in your cart</p>

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
					<CartSummary totalprice={totalprice} />
				</div>
			</section>
		</Suspense>
	)
}
