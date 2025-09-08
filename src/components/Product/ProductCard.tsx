"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/Interfaces"
import { renderStars } from "@/helpers/rating"
// import { div } from "framer-motion/client"
import Image from "next/image"
import { apiServices } from "@/services/api"
import toast from "react-hot-toast"
import Loader from "@/components/Loader/Loader";





interface ProductCardProps {
	viewMode?: "grid" | "list",
	product: Product

}

export default function ProductCard({ viewMode = "grid", product }: ProductCardProps) {
	const [addToCartLoader, setAddToCartLoader] = useState(false)

	async function handleAddToCart() {
		setAddToCartLoader(true)
		const data = await apiServices.addToCart(product!._id)
		if (data.status ===
			'success'
		) {
			toast.success(data.message)
		} else {
			toast.error(data.message)
		}

		setAddToCartLoader(false)
	}
	return (
		<section>
			{viewMode === "grid" ? (
				// 🔹 Grid view mode
				<div className="relative border rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition  h-full">
					{/* product image */}
					<div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg ">
						<Image src={product.imageCover}
							alt={product.title}
							fill
							className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 h-full"
							sizes="(max-width:766px) 100vw, (max-width:1200px) 50vw ,25vw" />

						{/* action icons */}
						<div className="absolute top-2 right-2 ">
							<Button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
								<Heart className="h-5 w-5 text-red-500" />
							</Button>
							{/* <Button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
								
							</Button> */}
						</div>
					</div>

					{/* title + brand */}
					<Link href={`/brands/${product.brand._id}`}>
						<span className="text-md text-gray-600 hover:underline hover:text-blue-700">{product.brand.name}</span>
					</Link>
					<Link href={`/products/${product.id}`}>
						<h2 className="text-lg font-semibold ">
							{product.title.length > 15 ? product.title.slice(0, 10) + "..." : product.title}
						</h2>
					</Link>
					{/* stars + category */}
					<div className="flex flex-col  justify-between text-sm text-gray-500 mb-1">
						<div className="flex  gap-1">
							{renderStars(product.ratingsAverage)}
							<span>
								({product.ratingsQuantity})
							</span>
						</div>
						<Link href="#">
							<span className="text-md text-gray-600 hover:underline hover:text-blue-700">{product.category.name}</span>
						</Link>
					</div>

					{/* price + sold quantity */}
					<div className="flex gap-4 justify-between ">
						<p className="text-gray-800 font-medium">${product.price}</p>
						<span className="text-gray-500 text-sm">
							{product.sold ? product.sold.toString().slice(0, 4) : 0} sold
						</span>
					</div>

					{/* popular badge for most sold product */}
					{
						product.sold > 100 && (
							<div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Popular</div>
						)
					}


					{/* actions */}
					<Button onClick={handleAddToCart} disabled={addToCartLoader} className="mt-4">
						{addToCartLoader ? <Loader /> : <>Add to cart <ShoppingCart className="h-5 w-5 text-white" /></>}
					</Button>

				</div>
			) : (
				//  list viewmode
				<div className="relative border rounded-2xl shadow-md p-4 flex md:flex-row flex-col items-center gap-6 hover:shadow-lg transition w-full overflow-hidden">

					{/* product image */}
					<div className="relative w-32 h-32 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
						<Image src={product.imageCover}
							alt={product.title}
							fill
							className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
							sizes="(max-width:766px) 100vw, (max-width:1200px) 50vw ,25vw" />

						{/* action icons */}
						<div className="absolute top-2 right-2 md:right-2 md:bottom-2 ">
							<Button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
								<Heart className="h-5 w-5 text-red-500" />
							</Button>

						</div>
					</div>

					{/* product details */}
					<div className="flex-1 flex flex-col justify-between">
						{/* brand + title */}
						<div className="mb-2">
							<Link href="#">
								<span className="text-sm text-gray-500 hover:underline hover:text-blue-700">{product.brand.name}</span>
							</Link>

							<Link href={`/products/${product.id}`}>	<h2 className="text-lg font-semibold line-clamp-2">
								{product.title.length > 15 ? product.title.slice(0, 10) + "..." : product.title}
							</h2>
							</Link>

							<p className="md:line-clamp-1 text-gray-500 text-sm">{product.description}</p>
						</div>

						{/* rating + sold + category */}
						<div className=" flex flex-col md:flex-row md:items-center md:justify-between mb-2">
							<div className=" flex gap-1">
								{renderStars(product.ratingsAverage)}
								<span className=" text-sm text-gray-500 ">
									({product.ratingsQuantity})
								</span>

							</div>
							<span className="text-gray-500 text-sm">
								{product.sold ? product.sold.toString().slice(0, 4) : 0} sold
							</span>
						</div>
						<Link href="#">
							<span className="text-sm text-gray-600 hover:underline hover:text-blue-700">{product.category.name}</span>
						</Link>

						{/* price + button */}
						<div className="flex items-center justify-between mt-3">
							<p className="text-lg font-semibold text-gray-800">${product.price}</p>
							{/* actions */}
							<Button onClick={handleAddToCart} disabled={addToCartLoader} className="mt-4">
								{addToCartLoader ? <Loader /> : <>Add to cart <ShoppingCart className="h-5 w-5 text-white" /></>}
							</Button>

						</div>
					</div>

					{/* badge for popular */}
					{product.sold > 100 && (
						<div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
							Popular
						</div>
					)}
				</div>
			)}
		</section>
	)
}
