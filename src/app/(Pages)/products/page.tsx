
import ProductGridContainer from "@/components/Product/ProductGridContainer"
import LoadingSpinner from "@/components/shared/LoadingSpinner"

import { Metadata } from "next"

import { Suspense } from "react"



export const metadata: Metadata = {
	title: "Products Page",
};

export default async function ProductsPage() {





	return (
		<Suspense fallback={<LoadingSpinner />}>
			<>
				<ProductGridContainer />


			</></Suspense>

	)
}
