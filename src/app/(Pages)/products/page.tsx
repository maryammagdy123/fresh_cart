
import { ApiResponse, Product } from "@/Interfaces"
import ProductGridContainer from "@/components/Product/ProductGridContainer"



export default async function ProductsPage() {

	const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
		cache: "force-cache"
	})
	const data: ApiResponse<Product> = await response.json()
	console.log(data.data)

	const products: Product[] = data.data


	return (
		<>
			<ProductGridContainer products={products} />

		</>
	)
}
