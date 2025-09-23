"use client"
import React, { useState, Suspense } from 'react'
import MainSlider from './MainSlider'
import { Button } from '../ui/button'
import { Grid, List } from 'lucide-react'
import { motion, Variants } from "framer-motion"
import { Product } from '@/Interfaces'

const ProductCard = React.lazy(() => import("./ProductCard"))

interface ProductGridContainerProps {
	products: Product[];
}

export default function ProductGridContainer({ products }: ProductGridContainerProps) {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

	const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut" as const,
			},
		},
	}

	return (
		<section>
			<div className="container mx-auto px-2 py-8">
				<div className="mb-3 my-7 px-7">
					<h1 className="text-4xl font-bold mb-4">Products</h1>
					<p>Discover amazing products from our collection</p>
				</div>

				<MainSlider />

				<div className="flex items-center justify-end mb-6 mt-4">
					<div className="flex items-center border rounded-md">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="sm"
							onClick={() => setViewMode("grid")}
							className="rounded-r-none"
						>
							<Grid className="h-4 w-4" />
						</Button>

						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="sm"
							onClick={() => setViewMode("list")}
							className="rounded-l-none"
						>
							<List className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<motion.div
					className={`grid gap-6 px-7 h-full ${viewMode === "grid"
						? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
						: "grid-cols-1"}`}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{products.map(product => (
						<motion.div key={product._id} variants={itemVariants}>
							<Suspense fallback={<div>Loading...</div>}>
								<ProductCard product={product} viewMode={viewMode} />
							</Suspense>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
