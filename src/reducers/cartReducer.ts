import { GetCartResponse } from "@/Interfaces"
// managing cart count ,


// initial state value
type CartInitState = {
	cart: GetCartResponse
	isLoading: boolean
}

// cart type actions
type CartActions =
	| { type: "SET_CART"; payload: GetCartResponse }
	| { type: "START_LOADING" }
	| { type: "STOP_LOADING" }
	| { type: "UPDATE_ITEM"; payload: { productId: string; count: number } }
	| { type: "DELETE_ITEM"; payload: { productId: string } }
	| { type: "CLEAR_CART" }

// reducer function
export function cartReducer(state: CartInitState, action: CartActions): CartInitState {
	switch (action.type) {
		case "SET_CART":
			return { ...state, cart: action.payload }

		case "START_LOADING":
			return { ...state, isLoading: true }

		case "STOP_LOADING":
			return { ...state, isLoading: false }

		case "UPDATE_ITEM":
			return {
				...state,
				cart: {
					...state.cart,
					data: {
						...state.cart.data,
						products: state.cart.data.products.map((item) =>
							item.product._id === action.payload.productId
								? { ...item, count: action.payload.count }
								: item
						),
					},
				},
			}

		case "DELETE_ITEM":
			return {
				...state,
				cart: {
					...state.cart,
					data: {
						...state.cart.data,
						products: state.cart.data.products.filter(
							(item) => item.product._id !== action.payload.productId
						),
					},
					numOfCartItems: state.cart.numOfCartItems - 1,
				},
			}

		case "CLEAR_CART":
			return {
				...state,
				cart: {
					...state.cart,
					data: { ...state.cart.data, products: [] },
					numOfCartItems: 0,
				},
			}

		default:
			return state
	}
}
