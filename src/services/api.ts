import { AddToCartResponse, ClearCartResponse, DeleteCartItemResponse, GetCartResponse, UpdateCartItemResponse } from '@/Interfaces/cart';

import { BrandResponse, CategoryResponse, ProductResponse, SingleBrandResponse, SingleProductResponse, SubcategoryResponse } from "@/types";


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


	// get all categories
	async getAllCategories(): Promise<CategoryResponse> {
		return await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories`, {
			cache: "force-cache",
		}
		).then((res) => res.json())
	}
	// get all subcategories
	async getAllSubcategories(): Promise<SubcategoryResponse> {
		return await fetch("https://ecommerce.routemisr.com/api/v1/subcategories", {
			cache: "force-cache",
		})
			.then((res) => res.json());
	}



	// headers
	getHeaders() {
		return {
			"Content-Type": "application/json",
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmM5NmM3YWY5NTQzMDZiMTAxNTQ1NSIsIm5hbWUiOiJNYXJpYW0gTWFnZHkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzM0Mjg1MywiZXhwIjoxNzY1MTE4ODUzfQ.HqAEbvRX4OO1NLocoCBgdcmXcUO-vSvQ4FtBZNUajVA"
		}
	}

	// add products to cart
	async addToCart(productId: string | string[]): Promise<AddToCartResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
			method: 'post',
			body: JSON.stringify({ productId }),
			headers: this.getHeaders()
		}).then((res) => res.json());
	}

	// get user cart
	async getUserCart(): Promise<GetCartResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
			headers: this.getHeaders()
		},).then((res) => res.json())
	}

	// delete specific cart item
	async deleteCartItem(productId: string): Promise<UpdateCartItemResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
			method: 'delete',
			headers: this.getHeaders()
		}).then((res) => res.json())
	}

	// update cart product quantity

	async updateCartProductQuantity(productId: string, count: number): Promise<UpdateCartItemResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
			method: `put`,
			body: JSON.stringify({ count }),
			headers: this.getHeaders()
		}).then((res) => res.json())
	}
	// clear cart
	async clearCart(): Promise<ClearCartResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
			method: `delete`,
			headers: this.getHeaders()
		}).then((res) => res.json())
	}

}

export const apiServices = new ApiServices()