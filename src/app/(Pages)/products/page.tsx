"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import MainSlider from "@/components/ProductHome/MainSlider"
import { Grid, List } from "lucide-react"
import ProductCard from "@/components/Product/ProductCard"
import { ProductResponse } from "@/types"
import { Product } from "@/Interfaces"


export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [viweMode, setViewMode] = useState<"grid" | "list">("grid")

	async function getAllProducts() {
		setLoading(true)
		const data: ProductResponse = await fetch(
			`https://ecommerce.routemisr.com/api/v1/products`
		).then((res) => res.json());
		setProducts(data.data)
		setLoading(false)
	}

	useEffect(() => {
		getAllProducts()
	}, [])

	if (loading && products.length == 0) {
		return <LoadingSpinner />
	}

	if (error) {
		return (
			<section className="container mx-auto px-4 py-20 text-center">
				<h1 className="text-3xl font-bold mb-4 text-red-600">Oops! Something went wrong 😢</h1>
				<p className="text-gray-600 mb-6">
					We couldn’t load the products right now. Please check your connection or try again later.
				</p>

				<div className="flex gap-4 justify-center">
					<Button onClick={() => window.location.reload()}>Try Again</Button>
					<Button asChild variant="outline">
						<Link href="/">Go Home</Link>
					</Button>
				</div>
			</section>
		);
	}

	return (
		<>
			<section>
				{/* Mainslider */}
				{/* <MainSlider /> */}

				<div className="container mx-auto px-4 py-8">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold mb-4">Products</h1>
						<p className="">Discover amazing products from our collection</p>
					</div>

					{/* setting view Mode */}
					<div className="flex items-center justify-end mb-6">
						<div className="flex  items-center border rounded-md">
							<Button
								variant={viweMode === "grid" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("grid")}
								className="rounded-r-none"
							>
								<Grid className="h-4 w-4" />
							</Button>

							<Button
								variant={viweMode === "list" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("list")}
								className="rounded-r-none"
							>
								<List className="h-4 w-4" />
							</Button>
						</div>
					</div>

					{/* Products cards */}
					<div
						className={`grid gap-6 ${viweMode == "grid"
							? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
							: "grid-cols-1"
							}`
						}>
						{
							products.map((product) => (
								<ProductCard key={product._id} product={product} viewMode={viweMode} />
							))
						}

					</div>


				</div>
			</section>

		</>
	)
}
