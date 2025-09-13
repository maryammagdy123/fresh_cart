import { Product } from "./product"

// getting users wishList api response
export interface WishListResponse {
	status: string
	count: number
	data: Product[]
}

// add or delete
export interface UpdateWishListResponse {
	status: string;
	message: string;
	data: string[];
}

