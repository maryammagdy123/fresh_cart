"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/Interfaces";
import { SingleProductResponse } from "@/types";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { apiServices } from "@/services/api";
import AddToCartBtn from "@/components/Cart/AddToCartBtn";



export default function ProductDetailPage() {
	const { id } = useParams<{ id: string }>()

	const [mainIndex, setMainIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [product, setProducts] = useState<Product | null>(null)
	const [loading, setLoading] = useState(false)


	async function getProductDetail() {
		setLoading(true)
		const data: SingleProductResponse = await apiServices.getSingleProduct(String(id))
		setProducts(data.data)
		setLoading(false)
	}



	useEffect(() => {
		getProductDetail()
	}, [])


	if (loading && !product) {
		return <LoadingSpinner />
	}

	return (
		<main className="max-w-6xl mx-auto px-4 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* LEFT: images */}
				<section className="relative">
					<div className="bg-white rounded-2xl shadow-md overflow-hidden">
						<div className="relative w-full aspect-[4/3] mx-auto p-4 bg-gray-50">
							{/* main image */}
							{
								product &&

								<div className="relative w-[400px] h-[400px] mx-auto">
									<Image
										src={product?.images[mainIndex]}
										alt={product?.title || "product image"}
										fill
										className="rounded-lg object-cover"
									/>
								</div>

							}
						</div>

						{/* thumbnails */}
						<div className="flex gap-2 p-3 overflow-x-auto">
							{product?.images.map((src, i) => (
								<Button
									key={i}
									onClick={() => setMainIndex(i)}
									className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border bg-white hover:bg-gray-300 ${i === mainIndex ? "ring-2 ring-primary" : "border-gray-200"
										}`}
								>
									<Image src={src} alt={`${product.title} ${i + 1}`} width={80} height={80} className="object-cover" />
								</Button>
							))}
						</div>
					</div>
				</section>

				{/* RIGHT: details */}
				<aside className="flex flex-col gap-4">
					<div>
						<Link href="#" className="text-sm text-gray-500">
							{product?.brand?.name}
						</Link>
						<br />
						<Link href="#" className="text-sm text-gray-500">
							{product?._id}
						</Link>
						<h1 className="text-2xl font-semibold mt-2 text-gray-900">{product?.title}</h1>

						<div className="flex items-center gap-3 mt-2">
							<div className="flex items-center gap-1 text-yellow-500">
								<Star className="h-4 w-4" />
								<span className="font-medium text-sm">{(product?.ratingsAverage ?? 0).toFixed(1)}</span>
							</div>
							<span className="text-sm text-gray-500">({product?.ratingsQuantity ?? 0} reviews)</span>
							<span className="text-sm text-gray-400">·</span>
							<span className="text-sm text-gray-500">{product?.sold ? product.sold.toString().slice(0, 4) : 0} sold</span>
						</div>

						<p className="mt-4 text-3xl font-bold text-primary">${product?.price.toLocaleString()}</p>
					</div>
					<div className="mt-2 bg-white rounded-lg shadow p-4">
						<details open className="mb-2 space-x-2.5">
							<summary className="font-medium cursor-pointer">Category</summary>
							<span className="mt-2 text-sm text-gray-700">{product?.category.name}</span>


						</details>

					</div>

					{/* buy card */}
					<div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
						<div className="flex md:items-center flex-col md:flex-row md:justify-between space-y-2">
							<div className="flex  items-center gap-3">
								<Button
									aria-label="decrease"
									onClick={() => setQuantity((q) => Math.max(1, q - 1))}
									className="w-8 h-8 rounded-md border flex items-center justify-center"
									disabled={quantity <= 1}
								>
									-
								</Button>
								<div className="min-w-[40px] text-center">{quantity}</div>
								<Button
									aria-label="increase"
									onClick={() => setQuantity((q) => q + 1)}
									className="w-8 h-8 rounded-md border flex items-center justify-center"

									disabled={product?.quantity === 0}
								>
									+
								</Button>
								<span className="text-sm text-gray-500">Quantity</span>
							</div>

							<div className="flex items-center gap-2">
								<Button className="p-2 rounded-md border hover:bg-gray-50" aria-label="add to wishlist">
									<Heart className="h-5 w-5 text-red-500" />
								</Button>
								<AddToCartBtn productQuantity={product?.quantity} productId={id} />

							</div>
						</div>
						{/* display quantity on stock */}
						{
							product?.quantity == 0 ? (<div>
								<p className="text-red-500"><span className="text-gray-500">Stock : </span> out of stock</p>
							</div>) : (<div>
								<p className="text-green-500"><span className="text-gray-500">Stock : </span> {product?.quantity} available</p>
							</div>)
						}
						<div className="text-sm text-gray-600">Fast delivery · 30 days returns · Secure payments</div>
					</div>

					{/* accordions  */}
					<div className="mt-2 bg-white rounded-lg shadow p-4">
						<details open className="mb-2">
							<summary className="font-medium cursor-pointer">Description</summary>
							<div className="mt-2 text-sm text-gray-700">{product?.description ?? "No description provided."}</div>
						</details>


						<details>
							<summary className="font-medium cursor-pointer">Reviews</summary>
							<div className="mt-2 text-sm text-gray-700">
								<div className="text-gray-500">No reviews yet.</div>
							</div>
						</details>
					</div>
				</aside>
			</div>


		</main>
	);
}
