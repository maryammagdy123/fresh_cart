import { CartProduct, ProductCart } from "./cart";

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
	cartItems: CartProduct<ProductCart>[];
	createdAt: string;
	updatedAt: string;
	id: number;
	__v: number;
}


export interface CheckoutOrderRes {
	status: string;
	session: {
		url: string
		success_url: string,
		cancel_url: string
	}
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