"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import LoadingSpinner from "@/components/shared/LoadingSpinner"


export default function ProductsPage() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)
	const [viweMode, setViewMode] = useState<"grid" | "list">("grid")

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

		</>
	)
}
