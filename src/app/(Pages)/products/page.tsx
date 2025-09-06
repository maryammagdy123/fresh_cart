
import { ApiResponse, Product } from "@/Interfaces"
import ProductGridContainer from "@/components/Product/ProductGridContainer"
import { apiServices } from "@/services/api"



export default async function ProductsPage() {


	const data: ApiResponse<Product> = await apiServices.getAllProducts()

	const products: Product[] = data.data


	return (
		<>
			<ProductGridContainer products={products} />
		</>
	)
}
