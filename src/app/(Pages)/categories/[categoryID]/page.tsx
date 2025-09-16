import { Category, Product } from "@/Interfaces"
import EmptyCategory from "@/components/Category/EmptyCategory"
import ProductCard from "@/components/Product/ProductCard"

import { getSingleCategory, getSingleCategoryAllProducts } from "@/services/api"
import { ProductResponse } from "@/types"
import { Metadata } from "next"


export async function generateMetadata({
	params,
}: {
	params: { categoryID: string };
}): Promise<Metadata> {
	try {
		const CategoryData = await getSingleCategory(params.categoryID);
		const category: Category = CategoryData.data;

		return {
			title: `${category.name} Products | MyShop`,
			description: `Browse and shop the latest products from ${category.name}.`,
			openGraph: {
				title: `${category.name} Products | MyShop`,
				description: `Discover top products from ${category.name}.`,
				url: `/brands/${params.categoryID}`,
			},
			twitter: {
				card: "summary_large_image",
				title: `${category.name} Products`,
				description: `Discover top products from ${category.name}.`,
			},
		};
	} catch {
		return {
			title: "Category Products",
			description: "Browse products for this category.",
		};
	}
}

export default async function SingleCategoryProductsPage({
	params,
}: {
	params: Promise<{ categoryID: string }>
}) {


	// subcategory
	const { categoryID } = await params;
	const data: ProductResponse = await getSingleCategoryAllProducts(categoryID)
	const products: Product[] = data.data


	// // Fetch single cat details

	const CategoryData = await getSingleCategory(categoryID)
	const Category: Category = CategoryData.data


	return (

		<section className="container mx-auto px-6 py-8">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-2">{Category?.name} Products</h1>
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
				<EmptyCategory />
			)}
		</section>

	)
}
