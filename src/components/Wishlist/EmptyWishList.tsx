"use client"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EmptyWishlist() {
	return (
		<div className="flex flex-col items-center justify-center text-center py-20 px-4">

			<div className="bg-pink-100 rounded-full p-6 mb-6">
				<Heart className="h-12 w-12 text-pink-500" />
			</div>


			<h2 className="text-2xl font-semibold mb-2">Your wishlist is empty 💔</h2>
			<p className="text-gray-600 max-w-md mb-6">
				Looks like you haven’t added any products yet.
				Save your favorite items and find them easily here later!
			</p>


			<Button asChild>
				<Link href="/products">Start Shopping</Link>
			</Button>
		</div>
	)
}
