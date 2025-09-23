import { CartProduct, Product } from "./cart";

export interface UserOrderResponse {
	_id: string;
	shippingAddress: ShippingAddress;
	taxPrice: number;
	shippingPrice: number;
	totalOrderPrice: number;
	paymentMethodType: "cash" | "card" | string;
	isPaid: boolean;
	isDelivered: boolean;
	user: OrderUser;
	cartItems: CartProduct<Product>[];
	createdAt: string;
	updatedAt: string;
	id: number;
	__v: number;
}

export interface ShippingAddress {
	details: string;
	phone: string;
	city: string;
}

export interface OrderUser {
	_id: string;
	name: string;
	email: string;
	phone: string;
}