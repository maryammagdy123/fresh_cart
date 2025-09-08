
import { Brand } from "./brand";
import { Category, Subcategory } from "./category";

export interface CartResponse {
	status: string,
	message: string,
	numOfCartItems: number,
	cartId: string,
	data: CartData,
}

interface CartData {
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