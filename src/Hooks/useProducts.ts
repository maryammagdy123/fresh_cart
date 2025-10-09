import { Product } from '@/Interfaces'
import { productReducer } from '@/reducers/productReducer'
import { getAllProducts } from '@/services/api'
import { useEffect, useReducer } from 'react'

export default function useProducts() {
	// reducer initialstate
	const initialState = {
		products: [] as Product[],
		filtered: [] as Product[],
		loading: false,
		error: null as string | null,
	}

	const [state, dispatch] = useReducer(productReducer, initialState)
	useEffect(() => {
		const fetchProducts = async () => {
			dispatch({ type: "FETCH_INIT" })
			try {
				const res = await getAllProducts(1)
				console.log(res)
				dispatch({ type: "FETCH_SUCCESS", payload: res.data })
			} catch (error: unknown) {
				dispatch({ type: "FETCH_ERROR", payload: String(error) })
			}
		}
		fetchProducts()
	}, [])

	return { state, dispatch }
}
