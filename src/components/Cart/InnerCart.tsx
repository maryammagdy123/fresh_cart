"use client"
import React, { useState } from 'react'
import CartList from './CartList'
import CartSummary from './CartSummary'
import { GetCartResponse } from '@/Interfaces/cart'
import { apiServices } from '@/services/api'
import toast from 'react-hot-toast'
import EmptyCart from './EmptyCart'
interface InnerCartProps {
	cartData: GetCartResponse

}
export default function InnerCart({ cartData }: InnerCartProps) {
	const [cart, setCart] = useState<GetCartResponse>(cartData)

	// delete item from cart
	async function handleDeleteCartItem(productId: string, setIsDelete: (value: boolean) => void) {
		setIsDelete(true)
		const data = await apiServices.deleteCartItem(productId)
		if (data.status === "success") {
			toast.success("Item removed successfully!!")
		}
		setIsDelete(false)
		const newCartResponseData = await apiServices.getUserCart()
		setCart(newCartResponseData)
	}
	// update cart product quantity
	async function handleUpdateCart(productId: string, count: number, setIsUpdate: (value: boolean) => void) {
		setIsUpdate(true)
		const data = await apiServices.updateCartProductQuantity(productId, count)

		setIsUpdate(false)
		const newCartResponseData = await apiServices.getUserCart()
		setCart(newCartResponseData)
	}
	// handle clear cart
	async function handleClearCart() {

	}
	if (cart.data.products.length === 0) {
		return <EmptyCart />
	}


	return (
		<>
			<section>
				<p className="text-gray-500 mb-4">You have {cart?.numOfCartItems} {cart?.numOfCartItems == 1 ? "item" : "items"} in your cart</p>
				<div className="grid lg:grid-cols-3 gap-8">
					{/* products list */}
					<div className="lg:col-span-2  space-y-4">

						{
							cart?.data?.products?.map((item) =>
								<CartList key={item._id} cartItem={item} handleDeleteCartItem={handleDeleteCartItem} handleUpdate={handleUpdateCart} />
							)

						}
					</div>

					{/* summary box */}
					<CartSummary cart={cart} />
				</div>
			</section>
		</>
	)
}
