import { Product } from "@/Interfaces";


type State = {
	products: Product[];
	filtered: Product[];
	loading: boolean;
	error: string | null;
};

type Action =
	| { type: "FETCH_INIT" }
	| { type: "FETCH_SUCCESS"; payload: Product[] }
	| { type: "FETCH_ERROR"; payload: string }
	| { type: "SEARCH"; payload: string };

export function productReducer(state: State, action: Action): State {
	switch (action.type) {
		case "FETCH_INIT":
			return { ...state, loading: true, error: null };

		case "FETCH_SUCCESS":
			return {
				...state,
				loading: false,
				products: action.payload,
				filtered: action.payload,
			};

		case "FETCH_ERROR":
			return { ...state, loading: false, error: action.payload };

		case "SEARCH":
			return {
				...state,
				filtered: state.products.filter((p) =>
					p.title.toLowerCase().includes(action.payload.toLowerCase())
				),
			};

		default:
			return state;
	}
}
