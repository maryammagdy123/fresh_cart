"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Loader2, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { addToCart } from '@/services/api'
import { cartContext } from '@/Context/CartContext'
import { useSession } from 'next-auth/react'
interface AddToCartBtnProps {
	productQuantity?: number | null
	productId: string
}



export default function AddToCartBtn({ productQuantity, productId }: AddToCartBtnProps) {
	const [addToCartLoader, setAddToCartLoader] = useState(false)
	const { status } = useSession()
	const { setCartCount } = useContext(cartContext)
	async function handleAddToCart() {
		setAddToCartLoader(true)
		const data = await addToCart(productId)
		if (data.status === 'success' || status === "authenticated") {
			toast.success(data.message)
			setCartCount(data.numOfCartItems)

		} else {
			toast.error(data.message)
		}

		setAddToCartLoader(false)
	}
	return (
		<Button onClick={handleAddToCart} disabled={addToCartLoader || productQuantity == 0} >
			{addToCartLoader && <Loader2 className='animate-spin' />}
			Add to cart <ShoppingCart className="h-5 w-5 text-white" />
		</Button>
	)
}
