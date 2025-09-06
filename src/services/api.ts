import { ProductResponse, SingleProductResponse } from "@/types";

class ApiServices {

	async getAllProducts(): Promise<ProductResponse> {
		return await fetch(
			`https://ecommerce.routemisr.com/api/v1/products`
		).then((res) => res.json());
	}
	async getSingleProduct(id: string | string[]): Promise<SingleProductResponse> {
		return await fetch(
			`https://ecommerce.routemisr.com/api/v1/products/${id}`
		).then((res) => res.json());
	}
}

export const apiServices = new ApiServices()