"use client"
import { Product } from "@/Interfaces"
import ProductGridCard from "./ProductGridCard"
import ProductListCard from "./ProductListCard"


interface ProductCardProps {
	viewMode?: "grid" | "list",
	product: Product

}

export default function ProductCard({ viewMode = "grid", product }: ProductCardProps) {



	return (
		<section>
			{viewMode === "grid" ? (
				// 🔹 Grid view mode
				<ProductGridCard product={product} />
			) : (
				//  list viewmode
				<ProductListCard product={product} />
			)}
		</section>
	)
}
