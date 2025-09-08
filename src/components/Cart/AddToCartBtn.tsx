import React from 'react'
import { Button } from '../ui/button'
import { Loader2, ShoppingCart } from 'lucide-react'
interface AddToCartBtnProps {
	productQuantity: number
	addToCartLoader: boolean
	handleAddToCart: () => void
}

export default function AddToCartBtn({ productQuantity, addToCartLoader, handleAddToCart }: AddToCartBtnProps) {
	return (
		<Button onClick={handleAddToCart} disabled={addToCartLoader || productQuantity == 0} className="mt-4">
			{addToCartLoader ? <Loader2 className='animate-spin' /> : <>Add to cart <ShoppingCart className="h-5 w-5 text-white" /></>}
		</Button>
	)
}
