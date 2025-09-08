
import { Brand } from "./brand";
import { Category, Subcategory } from "./category";

export interface AddToCartResponse {
	status: string,
	message: string,
	numOfCartItems: number,
	cartId: string,
	data: CartData<string>,
}
export interface GetCartResponse {
	status: string,
	message: string,
	numOfCartItems: number,
	cartId: string,
	data: CartData<Product>,
}

// product[] - string 
export interface CartData<T> {
	_id: string,
	cartOwner: string,
	products: CartProduct<T>[],
	createdAt: string,
	updatedAt: string,
	__v: number,
	totalCartPrice: number,
}

export interface CartProduct<T> {
	count: number,
	_id: string,
	// T either Product or product as string
	product: T,
	price: number,
}

export interface Product {
	subcategory: Subcategory[];
	_id: string,
	id?: string,
	title: string,
	quantity: number,
	imageCover?: string,
	category: Category,
	brand: Brand,
	ratingsAverage?: number
}