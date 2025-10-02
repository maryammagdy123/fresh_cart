"use client"
import React from 'react'
import CartList from './CartList'
import CartSummary from './CartSummary'
import { GetCartResponse } from '@/Interfaces/cart'
import EmptyCart from './EmptyCart'
import { Button } from '../ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useCart } from '@/Hooks/useCart'

interface InnerCartProps {
	cartData: GetCartResponse

}
export default function InnerCart({ cartData }: InnerCartProps) {
	const { cart,
		isLoading,
		handleClearCart, } = useCart(cartData)


	if (cart.data.products.length === 0) {
		return <EmptyCart />
	}


	return (
		<>
			<section>

				<p className="text-gray-500 mb-4">You have {cart?.numOfCartItems} {cart?.numOfCartItems == 1 ? "item" : "items"} in your cart</p>
				<Button className='my-4'
					variant="outline"
					size={'lg'}
					onClick={handleClearCart}
					disabled={isLoading}
					id='clearCartBtn'
				>
					{isLoading ? <Loader2 className='animate-spin' /> : <Trash2 className="h-4 w-4" />}	clear cart
				</Button>
				<div className="grid lg:grid-cols-3 gap-8">
					{/* products list */}
					<div className="lg:col-span-2  space-y-4">

						{
							cart?.data?.products?.map((item) =>
								<CartList key={item._id} cartItem={item} cartData={cart} />
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
