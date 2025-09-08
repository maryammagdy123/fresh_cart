export interface CartResponse {
	status: string
	message: string
	numOfCartItems: number
	cartId: string
	data: CartData
}

interface CartData {
	_id: string
	cartOwner: string
	products: CartProduct[]
	createdAt: string
	updatedAt: string
	__v: number
	totalCartPrice: number
}

interface CartProduct {
	count: number
	_id: string
	product: string
	price: number
}
