// app/brands/[id]/page.tsx
import { Brand, Product } from "@/Interfaces";
import EmptyBrands from "@/components/Brands/EmptyBrands";
import ProductCard from "@/components/Product/ProductCard";
import { apiServices } from "@/services/api";
import { ProductResponse } from "@/types";
import { Metadata } from "next";


export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	try {
		const brandData = await apiServices.getSingleBrand(params.id);
		const brand: Brand = brandData.data;

		return {
			title: `${brand.name} Products | MyShop`,
			description: `Browse and shop the latest products from ${brand.name}.`,
			openGraph: {
				title: `${brand.name} Products | MyShop`,
				description: `Discover top products from ${brand.name}.`,
				url: `/brands/${params.id}`,
			},
			twitter: {
				card: "summary_large_image",
				title: `${brand.name} Products`,
				description: `Discover top products from ${brand.name}.`,
			},
		};
	} catch {
		return {
			title: "Brand Products",
			description: "Browse products for this brand.",
		};
	}
}


export default async function BrandProductsPage({
	params,
}: {
	params: { id: string };
}) {
	const id = params.id;

	// Fetch products
	const data: ProductResponse = await apiServices.getSingleBrandAllProducts(id);
	const products: Product[] = data.data;

	// Fetch brand details
	const brandData = await apiServices.getSingleBrand(id);
	const brand: Brand = brandData.data;

	return (
		<section className="container mx-auto px-6 py-8">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-2">{brand?.name} Products</h1>
				{products?.length > 0 && (
					<p className="text-gray-600">
						Browse all products for this brand
					</p>
				)}
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
		</section>
	);
}
