import { GetCartResponse } from "@/Interfaces"
// managing cart count ,


// initial state value
type State = {
	cart: GetCartResponse
	isLoading: boolean
}

// cart type actions
type CartActions =
	| { type: "SET_CART", payload: GetCartResponse }
	| { type: "START_LOADING" }
	| { type: "STOP_LOADING" }

// reducer function
export function cartReducer(state: State, action: CartActions): State {
	switch (action.type) {
		case "SET_CART":
			return {
				...state,
				cart: action.payload
			}

		case "START_LOADING":
			return {
				...state,
				isLoading: true
			}
		case "STOP_LOADING":
			return {
				...state,
				isLoading: true
			}
		default:
			return { ...state }
	}
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
// // "use client"
// import React from 'react'
// import CartList from './CartList'
// import CartSummary from './CartSummary'
// import { GetCartResponse } from '@/Interfaces/cart'
// import EmptyCart from './EmptyCart'
// import { Button } from '../ui/button'
// import { Loader2, Trash2 } from 'lucide-react'
// import { useCart } from '@/Hooks/useCart'

// interface InnerCartProps {
// 	cartData: GetCartResponse

// }
// export default function InnerCart({ cartData }: InnerCartProps) {
// 	const { cart,
// 		isLoading,
// 		handleClearCart, } = useCart(cartData)


// 	if (cart.data.products.length === 0) {
// 		return <EmptyCart />
// 	}


// 	return (
// 		<>
// 			<section>

// 				<p className="text-gray-500 mb-4">You have {cart?.numOfCartItems} {cart?.numOfCartItems == 1 ? "item" : "items"} in your cart</p>
// 				<Button className='my-4'
// 					variant="outline"
// 					size={'lg'}
// 					onClick={handleClearCart}
// 					disabled={isLoading}
// 					id='clearCartBtn'
// 				>
// 					{isLoading ? <Loader2 className='animate-spin' /> : <Trash2 className="h-4 w-4" />}	clear cart
// 				</Button>
// 				<div className="grid lg:grid-cols-3 gap-8">
// 					{/* products list */}
// 					<div className="lg:col-span-2  space-y-4">

// 						{
// 							cart?.data?.products?.map((item) =>
// 								<CartList key={item._id} cartItem={item}  />
// 							)

// 						}
// 					</div>

// 					{/* summary box */}
// 					<CartSummary cart={cart} />
// 				</div>
// 			</section>
// 		</>
// 	)
// }
