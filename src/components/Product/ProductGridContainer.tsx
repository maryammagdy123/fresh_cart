"use client"
import React, { Suspense, useState } from 'react'
import MainSlider from './MainSlider'
import { Button } from '../ui/button'
import { Grid, List } from 'lucide-react'
import { motion } from "framer-motion"
import { Product } from '@/Interfaces'
import ProductCard from './ProductCard'
import LoadingSpinner from '../shared/LoadingSpinner'
interface ProductGridContainerProps {
	products: Product[];
}

export default function ProductGridContainer({ products }: ProductGridContainerProps) {
	const [viweMode, setViewMode] = useState<"grid" | "list">("grid")
	const ProductCard = React.lazy(() => import("./ProductCard"))

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 40 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
	}
	return (

		<section>
			<div className="container mx-auto px-2 py-8">
				<div className="mb-3 my-7 px-7">
					<h1 className="text-4xl font-bold mb-4">Products</h1>
					<p className="">Discover amazing products from our collection</p>
				</div>
				{/* slider */}
				<MainSlider />
				{/* Header */}


				{/* setting view Mode */}
				<div className="flex items-center justify-end mb-6 mt-4">
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
				<motion.div
					className={`grid gap-6 px-7 h-full ${viweMode == "grid"
						? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
						: "grid-cols-1"
						}`}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{products.map((product) => (
						<motion.div key={product._id} variants={itemVariants}>
							<ProductCard product={product} viewMode={viweMode} />
						</motion.div>
					))}
				</motion.div>


			</div>

		</section>

	)
}
