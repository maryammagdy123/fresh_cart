"use client"
import React, { useContext, useEffect, useState } from 'react'
import CartList from './CartList'
import CartSummary from './CartSummary'
import { GetCartResponse } from '@/Interfaces/cart'
import { clearCart, deleteCartItem, getUserCart, updateCartProductQuantity } from '@/services/api'
import toast from 'react-hot-toast'
import EmptyCart from './EmptyCart'
import { Button } from '../ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { cartContext } from '@/Context/CartContext'
interface InnerCartProps {
	cartData: GetCartResponse

}
export default function InnerCart({ cartData }: InnerCartProps) {
	const [cart, setCart] = useState<GetCartResponse>(cartData)
	const [isDelete, setIsDelete] = useState(false)
	const { setCartCount } = useContext(cartContext)


	useEffect(() => {
		setCartCount(cart.numOfCartItems)
	}, [cart])
	// delete item from cart
	// async function handleDeleteCartItem(productId: string, setIsDelete: (value: boolean) => void) {
	// 	setIsDelete(true)
	// 	const data = await deleteCartItem(productId)
	// 	if (data.statusMsg === "success") {
	// 		toast.success("Item removed successfully!!")
	// 	}
	// 	setIsDelete(false)
	// 	const newCartResponseData = await getUserCart()
	// 	setCart(newCartResponseData)
	// }
	// update cart product quantity
	// async function handleUpdateCart(productId: string, count: number) {
	// 	const response = await updateCartProductQuantity(productId, count)
	// 	console.log(response)
	// 	const newCartResponseData = await getUserCart()
	// 	setCart(newCartResponseData)
	// }
	// handle clear cart
	// async function handleClearCart(setIsDelete: (value: boolean) => void) {
	// 	setIsDelete(true)
	// 	const response = await clearCart()
	// 	setIsDelete(false)
	// 	const newCartResponseData = await getUserCart()
	// 	setCart(newCartResponseData)
	// }
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
					onClick={() => handleClearCart(setIsDelete)}
					disabled={isDelete}
					id='clearCartBtn'
				>
					{isDelete ? <Loader2 className='animate-spin' /> : <Trash2 className="h-4 w-4" />}	clear cart
				</Button>
				<div className="grid lg:grid-cols-3 gap-8">
					{/* products list */}
					<div className="lg:col-span-2  space-y-4">

						{
							cart?.data?.products?.map((item) =>
								<CartList key={item._id} cartItem={item} handleDeleteCartItem={handleDeleteCartItem} handleUpdate={handleUpdateCart} handleClearCart={handleClearCart} />
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
