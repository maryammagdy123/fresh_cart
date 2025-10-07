import React from 'react'
import { Button } from '../ui/button'
import { Heart, Loader2 } from 'lucide-react'
interface WishListButtonProps {
	isInWishlist: boolean
	isLoading: boolean
	onClick: () => Promise<void>

}
export default function WishListButton({ isInWishlist, isLoading, onClick }: WishListButtonProps) {
	return (

		<Button onClick={onClick} className="p-2 rounded-full bg-white shadow hover:bg-gray-100">
			{isLoading ? (
				<Loader2 className="animate-spin text-black" />
			) : (
				<Heart className="h-5 w-5 text-red-500" fill={isInWishlist ? "red" : "none"} />
			)}
		</Button>

	)
}

