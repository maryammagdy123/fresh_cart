import { useContext, useEffect, useReducer } from 'react';
import { cartReducer } from './../reducers/cartReducer';
import { GetCartResponse } from '@/Interfaces';
import { cartContext } from '@/Context/CartContext';
import { clearCart, deleteCartItem, getUserCart, updateCartProductQuantity } from '@/services/api';
import toast from 'react-hot-toast';

export function useCart(initialCart: GetCartResponse) {
	const [state, dispatch] = useReducer(cartReducer, {
		cart: initialCart,
		isLoading: false,
	})

	const { setCartCount } = useContext(cartContext)

	useEffect(() => {
		setCartCount(state.cart.numOfCartItems)
	}, [state.cart])

	// delete item
	async function handleDeleteCartItem(productId: string) {
		dispatch({ type: "DELETE_ITEM", payload: { productId } }) // Optimistic UI
		dispatch({ type: "START_LOADING" })

		const data = await deleteCartItem(productId)
		if (data.statusMsg === "success") {
			toast.success("Item removed successfully!")
			const newCart = await getUserCart()
			dispatch({ type: "SET_CART", payload: newCart })
		} else {
			toast.error(data.message || data.statusMsg)
		}

		dispatch({ type: "STOP_LOADING" })
	}

	// update quantity
	async function handleUpdateCart(productId: string, count: number) {
		dispatch({ type: "UPDATE_ITEM", payload: { productId, count } }) // Optimistic UI
		await updateCartProductQuantity(productId, count)
		const newCart = await getUserCart()
		dispatch({ type: "SET_CART", payload: newCart })
	}

	// clear cart
	async function handleClearCart() {
		dispatch({ type: "CLEAR_CART" }) // Optimistic UI
		dispatch({ type: "START_LOADING" })
		await clearCart()
		const newCart = await getUserCart()
		dispatch({ type: "SET_CART", payload: newCart })
		dispatch({ type: "STOP_LOADING" })
	}

	return {
		cart: state.cart,
		isLoading: state.isLoading,
		handleDeleteCartItem,
		handleUpdateCart,
		handleClearCart,
	}
}