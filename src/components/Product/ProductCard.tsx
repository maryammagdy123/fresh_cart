"use client"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/Interfaces"
import { renderStars } from "@/helpers/rating"

export default function ProductCard({ viewMode, product }: { viewMode: "grid" | "list", product: Product }) {
	return (
		<section>
			{viewMode === "grid" ? (
				// 🔹 Grid view mode
				<div className="border rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition">
					{/* product image */}
					<div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg">
						{/* <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" /> */}

						{/* action icons */}
						<div className="absolute top-2 right-2 flex gap-2">
							<Button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
								<Heart className="h-5 w-5 text-red-500" />
							</Button>
							<Button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
								<ShoppingCart className="h-5 w-5 text-gray-700" />
							</Button>
						</div>
					</div>

					{/* product details */}
					<h2 className="text-lg font-semibold">{product.title}</h2>

					{/* stars + sold count */}
					<div className="flex items-center justify-between text-sm text-gray-500 mb-1">
						<div className="flex gap-1">
							{renderStars(product.ratingsAverage)}
						</div>
					</div>

					<div className="flex gap-4 justify-between ">
						<div className="flex-1 max-w-sm">	<p className="text-gray-800 font-medium">${product.price}</p></div>
						<div className="flex-1">
							{/* <span className="max-w-sm">{Math.floor(product.sold)} sold</span> */}

						</div>
					</div>


					{/* actions */}
					<Button asChild className="mt-4 w-full">
						<Link href={`/products/${product.id}`}>View Details</Link>
					</Button>
				</div>
			) : (
				// 🔹 List view mode
				<div>
					<div className="border rounded-2xl shadow-md p-4 flex items-center gap-6 hover:shadow-lg transition w-full max-w-full overflow-hidden">

						{/* product image */}
						<div className="relative w-32 h-32 bg-gray-100 rounded-lg shrink-0">
							{/* <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" /> */}

							{/* action icons */}
							<div className="absolute top-2 right-2 flex gap-2">
								<Button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
									<Heart className="h-5 w-5 text-red-500" />
								</Button>
								<Button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
									<ShoppingCart className="h-5 w-5 text-gray-700" />
								</Button>
							</div>
						</div>

						{/* product details */}
						<div className="flex-1">
							<h2 className="text-xl font-semibold mb-2">{product.title}</h2>

							<div className="flex items-center justify-between text-sm text-gray-500 mb-1">
								<div className="flex gap-1">
									{renderStars(product.ratingsAverage)}
								</div>
								{/* <span>{Math.floor(product.sold)} sold</span> */}
							</div>

							<p className="text-gray-800 font-medium mb-4">${product.price}</p>

							<Button asChild>
								<Link href={`/products/${product.id}`}>View Details</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
