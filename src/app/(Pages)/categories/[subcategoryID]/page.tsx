import EmptyBrands from '@/components/Brands/EmptyBrands';
import ProductCard from '@/components/Product/ProductCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { Product, Subcategory } from '@/Interfaces';
import { apiServices } from '@/services/api';
import { ProductResponse } from '@/types';
import React, { Suspense } from 'react'

export default async function page({
	params,
}: {
	params: Promise<{ subcategoryID: string }>
}) {
	const param = await params
	// subcategory
	const id = param.subcategoryID;
	const data: ProductResponse = await apiServices.getSingleSubCategoryAllProducts(id)
	const products: Product[] = data.data


	// // Fetch single subcat details

	const subCtegoryData = await apiServices.getSingleSubcategory(id)
	const subcategory: Subcategory = subCtegoryData.data
	return (
		<Suspense fallback={<LoadingSpinner />}><section className="container mx-auto px-6 py-8">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-2">{subcategory?.name} Products</h1>
				{
					products?.length > 0 && <p className="text-gray-600">Browse all products for this Category</p>
				}
			</div>

			{/* Products Grid */}
			{products?.length > 0 ? (
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} viewMode="grid" />
					))}
				</div>
			) : (
				<EmptyBrands />
			)}
		</section></Suspense>
	)
}

