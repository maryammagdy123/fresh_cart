"use server"
import { RegisterFormValues } from '@/app/(Pages)/auth/register/page';
import { getToken } from '@/helpers/getUserToken';
// import { authHeaders } from '@/helpers/authHeaders';
import { AuthResponse, CodeRes, ForgetPasswordResponse, NewPassword } from '@/Interfaces';
import { AddToCartResponse, ClearCartResponse, GetCartResponse, UpdateCartItemResponse } from '@/Interfaces/cart';
import { CheckoutOrderRes, UserOrderResponse } from '@/Interfaces/order';
import { WishListResponse } from '@/Interfaces/wishlist';
import { CheckoutFormValues } from '@/schemas/checkout';
import { CodeFormValues, EmailFormValues, PasswordFormValues } from '@/schemas/forgetPassword';
import { AddToWishListResponse, BrandResponse, CategoryResponse, ProductResponse, RemoveFromWishListResponse, SingleBrandResponse, SingleCategoryResponse, SingleProductResponse, SingleSubcategoryResponse, SubcategoryResponse } from "@/types";


// -------------------BASE URL------------------------------
const BASE_URL = process.env.NEXT_BASE_URL
// -----------------------------headers and token-----------------------------------------------------

// headers
export async function getHeaders() {
	const Token = await getToken();
	return {
		"Content-Type": "application/json",
		token: Token as string
	};
}

// -----------------------------------------Products-----------------------------------------------------
// get All Products
export async function getAllProducts(page: number = 1, productBySearch: string = ""): Promise<ProductResponse> {
	return await fetch(`${BASE_URL}v1/products?page=${page}&fields=${productBySearch}`, {
		cache: "no-store"
		// next: {
		// 	revalidate: 3600
		// }
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
	const headers = await getHeaders();
	return await fetch(`${BASE_URL}v1/products?category[in]=${id}`, {
		headers
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
	const headers = await getHeaders();
	const res = await fetch(`${BASE_URL}v1/products?category[in]=${encodeURIComponent(id)}`, {
		cache: "no-store",
		headers
	})
	const data: ProductResponse = await res.json()
	return data
}




// ---------------------------------------Cart-------------------------------------------
// add products to cart
export async function addToCart(productId: string | string[]): Promise<AddToCartResponse> {
	const headers = await getHeaders();
	return await fetch(`${BASE_URL}v1/cart`, {
		method: 'post',
		body: JSON.stringify({ productId }),
		headers
	}).then((res) => res.json());

}

// get user cart
export async function getUserCart(): Promise<GetCartResponse> {
	const headers = await getHeaders();
	return await fetch(`${BASE_URL}v1/cart`, {
		headers
	}).then((res) => res.json())

}

// delete specific cart item
export async function deleteCartItem(productId: string): Promise<UpdateCartItemResponse> {
	const headers = await getHeaders();
	return await fetch(`${BASE_URL}v1/cart/${productId}`, {
		method: 'delete',
		headers
	}).then((res) => res.json())

}

// update cart product quantity

export async function updateCartProductQuantity(productId: string, count: number): Promise<UpdateCartItemResponse> {
	const headers = await getHeaders();
	return await fetch(`${BASE_URL}v1/cart/${productId}`, {

		method: `put`,
		body: JSON.stringify({ count }),
		headers
	}).then((res) => res.json())

}
// clear cart
export async function clearCart(): Promise<ClearCartResponse> {
	const headers = await getHeaders();
	return await fetch(`${BASE_URL}v1/cart`, {
		method: `delete`,
		headers
	}).then((res) => res.json())

}

// -------------------------------------------Wishlist--------------------------------------------------------------

// add to wishlist
export async function addToWishlist(productId: string): Promise<AddToWishListResponse> {
	const headers = await getHeaders();
	const res = await fetch(`${BASE_URL}v1/wishlist`, {
		method: "POST",
		headers,
		body: JSON.stringify({ productId }),
	});

	// if (!res.ok) throw new Error("Failed to add product");
	const data: AddToWishListResponse = await res.json();
	return data;
}


// remove from wishlist
export async function removeFromWishlist(productId: string): Promise<RemoveFromWishListResponse> {
	const headers = await getHeaders();
	const res = await fetch(`${BASE_URL}v1/wishlist/${productId}`, {
		method: "DELETE",
		headers,
		body: JSON.stringify({ productId }),
	});

	if (!res.ok) throw new Error("Failed to remove product");
	const data: RemoveFromWishListResponse = await res.json();
	return data;
}

// get wishlist

export async function getWishlist(): Promise<WishListResponse> {
	const headers = await getHeaders();
	const res = await fetch(`${BASE_URL}v1/wishlist`, {
		headers
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

// ----------------------------------------Get user orders -------------------------------------
export async function getUserOrders(userID: string | null): Promise<UserOrderResponse[]> {
	const res = await fetch(`${BASE_URL}v1/orders/user/${userID}`);
	const ordersRes: UserOrderResponse[] = await res.json();
	return ordersRes;
}


// ----------------------------------------Order Checkout---------------------------------------------
export async function checkoutOrder(cartID: string, values: CheckoutFormValues): Promise<CheckoutOrderRes> {
	const headers = await getHeaders();
	const res = await fetch(`${BASE_URL}v1/orders/checkout-session/${cartID}?url=${process.env.NEXTAUTHURL}`, {
		method: "POST",
		body: JSON.stringify(values),
		headers
	})
	const checkoutRes: CheckoutOrderRes = await res.json()
	return checkoutRes
}