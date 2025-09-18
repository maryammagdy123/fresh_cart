
"use server"
import { LoginFormValues } from '@/app/(Pages)/login/page';
import { RegisterFormValues } from '@/app/(Pages)/register/page';
import { AuthRespons, AuthResponse } from '@/Interfaces';
import { AddToCartResponse, ClearCartResponse, GetCartResponse, UpdateCartItemResponse } from '@/Interfaces/cart';
import { WishListResponse } from '@/Interfaces/wishlist';

import { AddToWishListResponse, BrandResponse, CategoryResponse, ProductResponse, RemoveFromWishListResponse, SingleBrandResponse, SingleCategoryResponse, SingleProductResponse, SingleSubcategoryResponse, SubcategoryResponse } from "@/types";

// -------------------BASE URL------------------------------
const BASE_URL = process.env.NEXT_BASE_URL
// -----------------------------headers-----------------------------------------------------

// headers
function getHeaders() {
	return {
		"Content-Type": "application/json",
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmM5NmM3YWY5NTQzMDZiMTAxNTQ1NSIsIm5hbWUiOiJNYXJpYW0gTWFnZHkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzM0Mjg1MywiZXhwIjoxNzY1MTE4ODUzfQ.HqAEbvRX4OO1NLocoCBgdcmXcUO-vSvQ4FtBZNUajVA"
	}
}

// -----------------------------------------Products-----------------------------------------------------
// get All Products
export async function getAllProducts(page: number = 1): Promise<ProductResponse> {
	return await fetch(`${BASE_URL}v1/products?page=${page}`, {
		// cache: "force-cache"
		next: {
			revalidate: 3600
		}
	}).then((res) => res.json());
}

// get single product Details
export async function getSingleProduct(id: string | string[]): Promise<SingleProductResponse> {
	return await fetch(
		`${BASE_URL}v1/products/${id}`
	).then((res) => res.json());
}



// ---------------------------------------Brands------------------------------------------------------------

// get all brands
export async function getAllBrands(): Promise<BrandResponse> {
	return await fetch(`${BASE_URL}v1/brands`, {
		cache: "force-cache",
	})
		.then((res) => res.json());
}

// get all products of the single Brand
export async function getSingleBrandAllProducts(id: string | string[]): Promise<ProductResponse> {
	return await fetch(`${BASE_URL}v1/products?brand=${id}`, {
		cache: "force-cache",
	}).then((res) => res.json());
}

// get Single barnd
export async function getSingleBrand(id: string | string[]): Promise<SingleBrandResponse> {
	return await fetch(`${BASE_URL}v1/brands/${id}`, {
		cache: "force-cache",
	}).then((res) => res.json());
}

// --------------------------------Categories--------------------------------------------------------------
// get all categories
export async function getAllCategories(): Promise<CategoryResponse> {
	return await fetch(
		`${BASE_URL}v1/categories`, {
		cache: "force-cache",
	}
	).then((res) => res.json())
}

// get single category 
export async function getSingleCategory(id: string): Promise<SingleCategoryResponse> {
	return fetch(`${BASE_URL}v1/categories/${id}`, {
		cache: "force-cache",
	}).then((res) => res.json());
}
// get all products with specific category
export async function getSingleCategoryAllProducts(id: string): Promise<ProductResponse> {
	return await fetch(`${BASE_URL}v1/products?category[in]=${id}`, {
		headers: getHeaders()
	}).then((res) => res.json())
}

// ------------------------------------Subcategories---------------------------------------------------
// get all subcategories
export async function getAllSubcategories(): Promise<SubcategoryResponse> {
	return await fetch(`${BASE_URL}v1/subcategories`, {
		cache: "force-cache",
	})
		.then((res) => res.json());
}

// get spesific subcategory
export async function getSingleSubcategory(id: string): Promise<SingleSubcategoryResponse> {
	return await fetch(`${BASE_URL}v1/subcategories/${id}`, {
		cache: "force-cache"
	}).then((res) => res.json())
}

// get all products with specific subcategory
export async function getSingleSubCategoryAllProducts(id: string): Promise<ProductResponse> {
	return await fetch(`${BASE_URL}v1/products?category[in]=${encodeURIComponent(id)}`, {
		cache: "no-store",
		headers: getHeaders()
	}).then((res) => res.json());
}




// ---------------------------------------Cart-------------------------------------------
// add products to cart
export async function addToCart(productId: string | string[]): Promise<AddToCartResponse> {
	return await fetch(`${BASE_URL}v1/cart`, {
		method: 'post',
		body: JSON.stringify({ productId }),
		headers: getHeaders()
	}).then((res) => res.json());
}

// get user cart
export async function getUserCart(): Promise<GetCartResponse> {
	return await fetch(`${BASE_URL}v1/cart`, {
		headers: getHeaders()
	}).then((res) => res.json())
}

// delete specific cart item
export async function deleteCartItem(productId: string): Promise<UpdateCartItemResponse> {
	return await fetch(`${BASE_URL}v1/cart/${productId}`, {
		method: 'delete',
		headers: getHeaders()
	}).then((res) => res.json())
}

// update cart product quantity

export async function updateCartProductQuantity(productId: string, count: number): Promise<UpdateCartItemResponse> {
	return await fetch(`${BASE_URL}v1/cart/${productId}`, {
		method: `put`,
		body: JSON.stringify({ count }),
		headers: getHeaders()
	}).then((res) => res.json())
}
// clear cart
export async function clearCart(): Promise<ClearCartResponse> {
	return await fetch(`${BASE_URL}v1/cart`, {
		method: `delete`,
		headers: getHeaders()
	}).then((res) => res.json())
}

// -------------------------------------------Wishlist--------------------------------------------------------------

// add to wishlist
export async function addToWishlist(productId: string): Promise<AddToWishListResponse> {
	const res = await fetch(`${BASE_URL}v1/wishlist`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify({ productId }),
	});

	if (!res.ok) throw new Error("Failed to add product");
	const data: AddToWishListResponse = await res.json();
	return data;
}


// remove from wishlist
export async function removeFromWishlist(productId: string): Promise<RemoveFromWishListResponse> {
	const res = await fetch(`${BASE_URL}v1/wishlist/${productId}`, {
		method: "DELETE",
		headers: getHeaders(),
		body: JSON.stringify({ productId }),
	});

	if (!res.ok) throw new Error("Failed to remove product");
	const data: AddToWishListResponse = await res.json();
	return data;
}

// get wishlist

export async function getWishlist(): Promise<WishListResponse> {
	const res = await fetch(`${BASE_URL}v1/wishlist`, {
		headers: getHeaders(),
	})
	const data: WishListResponse = await res.json();
	return data;
}

// -------------------------------------Sign Up-----------------------------------------------
export async function SignUp(values: RegisterFormValues): Promise<AuthResponse> {
	const res = await fetch(`${BASE_URL}v1/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});

	const data: AuthResponse = await res.json();
	return data;
}
// -------------------------------------Sign Up-----------------------------------------------
export async function Login(values: LoginFormValues): Promise<AuthResponse> {
	const res = await fetch(`${BASE_URL}v1/auth/signin`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});

	const data: AuthResponse = await res.json();
	return data;
}
