
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
interface CartData<T> {
	_id: string,
	cartOwner: string,
	products: CartProduct[],
	createdAt: string,
	updatedAt: string,
	__v: number,
	totalCartPrice: number,
}

interface CartProduct {
	count: number,
	_id: string,
	product: string | Product,
	price: number,
}

export interface Product {
	subcategory: Subcategory[];
	_id: string;
	id?: string;
	title: string;
	quantity: number;
	imageCover?: string;
	category: Category;
	brand: Brand;
	ratingsAverage?: number;
}