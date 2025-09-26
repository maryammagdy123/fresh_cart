
import { Product } from "@/Interfaces"
import ProductGridContainer from "@/components/Product/ProductGridContainer"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { getAllProducts } from "@/services/api"
import { ProductResponse } from "@/types"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"



export const metadata: Metadata = {
	title: "Products Page",
};

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: { page?: string }
}) {

	const params = searchParams
	const page = Number(params?.page) || 1
	const data: ProductResponse = await getAllProducts(page)
	const products: Product[] = data.data
	const totalPages = data.metadata.numberOfPages
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<>
				<ProductGridContainer products={products} />
				{/* Pagination */}
				<div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 ">
					<div className="flex items-center space-x-2 bg-white shadow-md px-4 py-2 rounded-lg">
						{/* Prev button */}
						{page > 1 && (
							<Link
								href={`/products?page=${page - 1}`}
								className="px-3 py-1 border rounded-md  hover:bg-gray-100"
							>
								Prev
							</Link>
						)}

						{/* Page numbers */}
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
							<Link
								key={num}
								href={`/products?page=${num}`}
								className={`px-3 py-1 border  rounded-md ${num === page
									? "bg-black text-white border-black"
									: "hover:bg-gray-100"
									}`}
							>
								{num}
							</Link>
						))}

						{/* Next button */}
						{page < totalPages && (
							<Link
								href={`/products?page=${page + 1}`}
								className="px-3 py-1 border rounded-md hover:bg-gray-100"
							>
								Next
							</Link>
						)}
					</div>
				</div>

			</></Suspense>

	)
}
