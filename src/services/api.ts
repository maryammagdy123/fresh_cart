import { Cart, CartResponse, } from "@/Interfaces/cart";
import { BrandResponse, ProductResponse, SingleBrandResponse, SingleProductResponse } from "@/types";


class ApiServices {

	// get All Products
	async getAllProducts(page: number = 1): Promise<ProductResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`, {
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

	// headers
	getHeaders() {
		return {
			"Content-Type": "application / json",
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmM5NmM3YWY5NTQzMDZiMTAxNTQ1NSIsIm5hbWUiOiJNYXJpYW0gTWFnZHkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzM0Mjg1MywiZXhwIjoxNzY1MTE4ODUzfQ.HqAEbvRX4OO1NLocoCBgdcmXcUO-vSvQ4FtBZNUajVA"
		}
	}

	// add products to cart
	async addToCart(productId: string | string[]): Promise<CartResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
			method: 'post',
			body: JSON.stringify({ productId }),
			headers: this.getHeaders()
		}).then((res) => res.json());
	}


}

export const apiServices = new ApiServices()