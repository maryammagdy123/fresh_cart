
import { Product } from "@/Interfaces"
import ProductGridContainer from "@/components/Product/ProductGridContainer"
import { apiServices } from "@/services/api"
import { ProductResponse } from "@/types"



export default async function ProductsPage() {
	const data: ProductResponse = await apiServices.getAllProducts()
	const products: Product[] = data.data

	return (
		<>
			<ProductGridContainer products={products} />
		</>
	)
}
