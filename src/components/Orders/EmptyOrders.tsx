"use client"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EmptyOrders() {
	return (
		<div className="flex flex-col items-center justify-center text-center py-20 px-4">

			<div className="bg-blue-100 rounded-full p-6 mb-6">
				<Package className="h-12 w-12 text-blue-500" />
			</div>


			<h2 className="text-2xl font-semibold mb-2">No orders yet 📦</h2>
			<p className="text-gray-600 max-w-md mb-6">
				You haven’t placed any orders yet.
				When you do, you’ll see them all listed here!
			</p>


			<Button asChild>
				<Link href="/products">Shop Now</Link>
			</Button>
		</div>
	)
}
