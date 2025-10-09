"use client"
import { Product } from "@/Interfaces"
import ProductGridCard from "./ProductGridCard"
import ProductListCard from "./ProductListCard"
import React from "react"


interface ProductCardProps {
	viewMode?: "grid" | "list",
	product: Product

}

function ProductCard({ viewMode = "grid", product }: ProductCardProps) {



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
export default React.memo(ProductCard);