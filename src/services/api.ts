"use server"
import { RegisterFormValues } from '@/app/(Pages)/auth/register/page';
import { authHeaders } from '@/helpers/authHeaders';
import { AuthResponse, CodeRes, ForgetPasswordResponse, NewPassword } from '@/Interfaces';
import { AddToCartResponse, ClearCartResponse, GetCartResponse, UpdateCartItemResponse } from '@/Interfaces/cart';
import { WishListResponse } from '@/Interfaces/wishlist';
import { CodeFormValues, EmailFormValues, PasswordFormValues } from '@/schemas/forgetPassword';


import { AddToWishListResponse, BrandResponse, CategoryResponse, ProductResponse, RemoveFromWishListResponse, SingleBrandResponse, SingleCategoryResponse, SingleProductResponse, SingleSubcategoryResponse, SubcategoryResponse } from "@/types";

// -------------------BASE URL------------------------------
const BASE_URL = process.env.NEXT_BASE_URL
// -----------------------------headers and token-----------------------------------------------------

// // headers
// async function getHeaders() {
// 	const token = await getUserToken()
// 	return {
// 		"Content-Type": "application/json",
// 		token: token
// 	}
// }

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
		headers: await authHeaders()
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

	const res = await fetch(`${BASE_URL}v1/products?category[in]=${encodeURIComponent(id)}`, {
		cache: "no-store",
		headers: await authHeaders()
	})
	const data: ProductResponse = await res.json()
	return data
}




// ---------------------------------------Cart-------------------------------------------
// add products to cart
export async function addToCart(productId: string | string[]): Promise<AddToCartResponse> {

	const res = await fetch(`${BASE_URL}v1/cart`, {
		method: 'post',
		body: JSON.stringify({ productId }),
		headers: await authHeaders()
	})
	const data: AddToCartResponse = await res.json()
	return data
}

// get user cart
export async function getUserCart(): Promise<GetCartResponse> {
	const res = await fetch(`${BASE_URL}v1/cart`, {
		headers: await authHeaders()
	})
	const data: GetCartResponse = await res.json()
	return data
}

// delete specific cart item
export async function deleteCartItem(productId: string): Promise<UpdateCartItemResponse> {

	const res = await fetch(`${BASE_URL}v1/cart/${productId}`, {
		method: 'delete',
		headers: await authHeaders()
	})
	const data: UpdateCartItemResponse = await res.json()
	return data
}

// update cart product quantity

export async function updateCartProductQuantity(productId: string, count: number): Promise<UpdateCartItemResponse> {

	const res = await fetch(`${BASE_URL}v1/cart/${productId}`, {
		method: `put`,
		body: JSON.stringify({ count }),
		headers: await authHeaders()
	})
	const data: UpdateCartItemResponse = await res.json()
	return data
}
// clear cart
export async function clearCart(): Promise<ClearCartResponse> {

	const res = await fetch(`${BASE_URL}v1/cart`, {
		method: `delete`,
		headers: await authHeaders()
	})
	const data: ClearCartResponse = await res.json()
	return data
}

// -------------------------------------------Wishlist--------------------------------------------------------------

// add to wishlist
export async function addToWishlist(productId: string): Promise<AddToWishListResponse> {

	const res = await fetch(`${BASE_URL}v1/wishlist`, {
		method: "POST",
		headers: await authHeaders(),
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
		headers: await authHeaders(),
		body: JSON.stringify({ productId }),
	});

	if (!res.ok) throw new Error("Failed to remove product");
	const data: AddToWishListResponse = await res.json();
	return data;
}

// get wishlist

export async function getWishlist(): Promise<WishListResponse> {

	const res = await fetch(`${BASE_URL}v1/wishlist`, {
		headers: await authHeaders()
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
// // -------------------------------------Login Up-----------------------------------------------
// export async function Login(values: LoginFormValues): Promise<AuthResponse> {
// 	const res = await fetch(`${BASE_URL}v1/auth/signin`, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(values),
// 	});

// 	const data: AuthResponse = await res.json();
// 	return data;
// }
// -------------------------------------Login Up-----------------------------------------------
export async function LoginNextAuth(email: string, password: string): Promise<AuthResponse> {
	const res = await fetch(`${BASE_URL}v1/auth/signin`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			password
		}),
	});

	const data: AuthResponse = await res.json();
	return data;
}


// --------------------------------------ForgotPassword--------------------------------------------------------------
export async function forgetPassword(values: EmailFormValues): Promise<ForgetPasswordResponse> {
	const res = await fetch(`${BASE_URL}v1/auth/forgotPasswords`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});

	const data: ForgetPasswordResponse = await res.json();
	if (!res.ok) throw new Error(data?.message || "Request failed");
	return data;
}

export async function verifyCode(values: CodeFormValues): Promise<CodeRes> {
	const res = await fetch(`${BASE_URL}v1/auth/verifyResetCode`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});

	const data: CodeRes = await res.json();
	if (!res.ok) throw new Error(data?.status || "Request failed");
	return data;
}

export async function resetPassword(values: PasswordFormValues): Promise<NewPassword> {
	const res = await fetch(`${BASE_URL}v1/auth/resetPassword`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});

	const data: NewPassword = await res.json();

	return data;
}
