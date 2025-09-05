"use client"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EmptyCart() {
	return (
		<div className="flex flex-col items-center justify-center text-center py-20 px-4">

			<div className="bg-yellow-100 rounded-full p-6 mb-6">
				<ShoppingCart className="h-12 w-12 text-yellow-500" />
			</div>

			<h2 className="text-2xl font-semibold mb-2">Your cart is empty 🛒</h2>
			<p className="text-gray-600 max-w-md mb-6">
				Looks like you haven’t added anything to your cart yet.
				Start exploring our products and add your favorites here!
			</p>


			<Button asChild>
				<Link href="/products">Browse Products</Link>
			</Button>
		</div>
	)
}
