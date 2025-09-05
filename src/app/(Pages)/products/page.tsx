
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Product = {
	id: number
	name: string
	price: number
	image?: string
}

const products: Product[] = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: 120,

	},
	{
		id: 2,
		name: "Smartphone",
		price: 699,

	},
	{
		id: 3,
		name: "Smart Watch",
		price: 199,

	},
	{
		id: 4,
		name: "Gaming Mouse",
		price: 49,

	},
]

export default function ProductsPage() {
	return (
		<section className="container mx-auto px-4 py-20">
			<h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{products.map((product) => (
					<div
						key={product.id}
						className="border rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
					>
						{/* product image */}
						<div className="relative w-full h-48 mb-4">

						</div>

						{/* product details */}
						<h2 className="text-lg font-semibold">{product.name}</h2>
						<p className="text-gray-600">${product.price}</p>

						{/* actions */}
						<Button asChild className="mt-4 w-full">
							<Link href={`/products/${product.id}`}>View Details</Link>
						</Button>
					</div>
				))}
			</div>
		</section>
	)
}
