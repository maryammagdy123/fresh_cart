"use client"
import React, { useState, Suspense, useReducer, useEffect } from 'react'
import MainSlider from './MainSlider'
import { Button } from '../ui/button'
import { AlertCircle, Grid, List } from 'lucide-react'
import { motion, Variants } from "framer-motion"
import { Product } from '@/Interfaces'
import { productReducer } from '@/reducers/productReducer'
import { getAllProducts } from '@/services/api'
import { Input } from '../ui/input'
import LoadingSpinner from '../shared/LoadingSpinner'
import { Card } from '@mui/material'
import ProductCardSkeleton from '../ProductCardSkeleton/ProductCardSkeleton'

const ProductCard = React.lazy(() => import("./ProductCard"))



export default function ProductGridContainer() {
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

	// reducer initialstate
	const initialState = {
		products: [] as Product[],
		filtered: [] as Product[],
		loading: false,
		error: null as string | null,
	}

	const [state, dispatch] = useReducer(productReducer, initialState)
	useEffect(() => {
		const fetchProducts = async () => {
			dispatch({ type: "FETCH_INIT" })
			try {
				const res = await getAllProducts(1) // صفحة ١
				dispatch({ type: "FETCH_SUCCESS", payload: res.data })
			} catch (error: any) {
				dispatch({ type: "FETCH_ERROR", payload: error.message })
			}
		}
		fetchProducts()
	}, [])

	if (state.loading) return <ProductCardSkeleton viewMode={viewMode} />
	if (state.error) return <p className="text-center text-red-500">Error: {state.error}</p>


	return (
		<section>
			<div className="container mx-auto px-2 py-8">
				<div className="mb-3 my-7 px-7">
					<h1 className="text-4xl font-bold mb-4">Products</h1>
					<p>Discover amazing products from our collection</p>
				</div>

				<MainSlider />

				{/* 🔎 Search input */}

				<Input
					type="text"
					placeholder="Search products..."
					className="border rounded-md p-2 w-1/2 mx-auto"
					onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
				/>


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

				{/* {products.map(product => (
						<motion.div key={product._id} variants={itemVariants}>
						<Suspense fallback={<div>Loading...</div>}>
						<ProductCard product={product} viewMode={viewMode} />
						</Suspense>
						</motion.div>
						))} */}
				{/* 🔹 Check if no products found */}
				{state.filtered.length === 0 ? (
					<div className="flex justify-center mt-10">
						<div className="w-full sm:w-1/2 md:w-1/3 shadow-lg border border-gray-200">
							<div className="flex flex-col items-center text-center py-8">
								<AlertCircle className="w-12 h-12 text-red-500 mb-3" />
								<h2 className="text-xl font-semibold text-gray-800 mb-2">
									No Products Found
								</h2>
								<p className="text-gray-500">
									We couldnt find any products matching your search.
								</p>
							</div>
						</div>
					</div>
				) : (
					<motion.div
						className={`grid gap-6 px-7 h-full ${viewMode === "grid"
							? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
							: "grid-cols-1"
							}`}
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{state.filtered.map((product) => (
							<motion.div key={product._id} variants={itemVariants}>
								<Suspense fallback={<ProductCardSkeleton viewMode={viewMode} />}>
									<ProductCard product={product} viewMode={viewMode} />
								</Suspense>
							</motion.div>
						))}
					</motion.div>
				)}
			</div>
		</section>
	)
}
