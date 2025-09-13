import { AddToCartResponse, ClearCartResponse, GetCartResponse, UpdateCartItemResponse } from '@/Interfaces/cart';

import { AddToWishListResponse, BrandResponse, CategoryResponse, ProductResponse, SingleBrandResponse, SingleCategoryResponse, SingleProductResponse, SingleSubcategoryResponse, SubcategoryResponse } from "@/types";


class ApiServices {
	// -----------------------------headers-----------------------------------------------------

	// headers
	getHeaders() {
		return {
			"Content-Type": "application/json",
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmM5NmM3YWY5NTQzMDZiMTAxNTQ1NSIsIm5hbWUiOiJNYXJpYW0gTWFnZHkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzM0Mjg1MywiZXhwIjoxNzY1MTE4ODUzfQ.HqAEbvRX4OO1NLocoCBgdcmXcUO-vSvQ4FtBZNUajVA"
		}
	}

	// -----------------------------------------Products-----------------------------------------------------
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



	// ---------------------------------------Brands------------------------------------------------------------

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

	// --------------------------------Categories--------------------------------------------------------------
	// get all categories
	async getAllCategories(): Promise<CategoryResponse> {
		return await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories`, {
			cache: "force-cache",
		}
		).then((res) => res.json())
	}

	// get single category 
	async getSingleCategory(id: string): Promise<SingleCategoryResponse> {
		return fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
			cache: "force-cache",
		}).then((res) => res.json());
	}
	// get all products with specific category
	async getSingleCategoryAllProducts(id: string): Promise<ProductResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`, {
			headers: this.getHeaders()
		}).then((res) => res.json())
	}

	// ------------------------------------Subcategories---------------------------------------------------
	// get all subcategories
	async getAllSubcategories(): Promise<SubcategoryResponse> {
		return await fetch("https://ecommerce.routemisr.com/api/v1/subcategories", {
			cache: "force-cache",
		})
			.then((res) => res.json());
	}

	// get spesific subcategory
	async getSingleSubcategory(id: string): Promise<SingleSubcategoryResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`, {
			cache: "force-cache"
		}).then((res) => res.json())
	}

	// get all products with specific subcategory
	async getSingleSubCategoryAllProducts(id: string): Promise<ProductResponse> {
		return await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${encodeURIComponent(id)}`, {
			cache: "no-store",
			headers: this.getHeaders()
		}).then((res) => res.json());
	}




	// ---------------------------------------Cart-------------------------------------------
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
		}).then((res) => res.json())
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



	// add to wishlist
	async addToWishlist(productId: string): Promise<AddToWishListResponse> {
		const res = await fetch("/api/wishlist", {
			method: "POST",
			headers: this.getHeaders(),
			body: JSON.stringify({ productId }),
		});

		if (!res.ok) throw new Error("Failed to add product");
		const data: AddToWishListResponse = await res.json();
		return data;
	}

}

export const apiServices = new ApiServices()