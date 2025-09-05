import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'lucide-react'

export default function ProductCard() {
	return (
		<section className="container mx-auto px-4 py-20">
			<h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

				<div

					className="border rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
				>
					{/* product image */}
					<div className="relative w-full h-48 mb-4">

					</div>

					{/* product details */}
					<h2 className="text-lg font-semibold">name</h2>
					<p className="text-gray-600">price</p>

					{/* actions */}
					<Button asChild className="mt-4 w-full">
						<Link >View Details</Link>
					</Button>
				</div>

			</div>
		</section>
	)
}

// href={`/products/${product.id}`}