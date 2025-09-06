import { BrandResponse, ProductResponse, SingleBrandResponse, SingleProductResponse } from "@/types";

class ApiServices {

	// get All Products
	async getAllProducts(): Promise<ProductResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
			// cache: "force-cache"
			next: {
				revalidate: 3600
			}
		}).then((res) => res.json());
	}

	// get single product Details
	async getSingleProduct(id: string | string[]): Promise<SingleProductResponse> {
		return await fetch(
			`https://ecommerce.routemisr.com/api/v1/products/${id}`
		).then((res) => res.json());
	}

	// get all brands
	async getAllBrands(): Promise<BrandResponse> {
		return await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
			cache: "force-cache",
		})
			.then((res) => res.json());
	}

	// get all products of the single Brand
	async getSingleBrandAllProducts(id: string | string[]): Promise<ProductResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`, {
			cache: "no-store",
		}).then((res) => res.json());
	}

	// get Single barnd
	async getSingleBrand(id: string | string[]): Promise<SingleBrandResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
			cache: "force-cache",
		}).then((res) => res.json());
	}




}

export const apiServices = new ApiServices()