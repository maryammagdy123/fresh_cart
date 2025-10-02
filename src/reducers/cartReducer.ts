import { GetCartResponse } from "@/Interfaces"
// managing cart count ,


// initial state value
type CartInitState = {
	cart: GetCartResponse
	isLoading: boolean
}

// cart type actions
type CartActions =
	| { type: "SET_CART", payload: GetCartResponse }
	| { type: "START_LOADING" }
	| { type: "STOP_LOADING" }

// reducer function
export function cartReducer(state: CartInitState, action: CartActions): CartInitState {
	switch (action.type) {
		case "SET_CART":
			return {
				...state,
				cart: action.payload
			}

		case "START_LOADING":
			return {
				...state,
				isLoading: true
			}
		case "STOP_LOADING":
			return {
				...state,
				isLoading: false
			}
		default:
			return { ...state }
	}
}
