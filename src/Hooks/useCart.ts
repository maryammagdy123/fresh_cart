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
	}, [state.cart, setCartCount])


	// handle delete item from cart
	async function handleDeleteCartItem(productId: string) {
		dispatch({ type: "START_LOADING" })
		const data = await deleteCartItem(productId)
		if (data.statusMsg === "success") {
			toast.success("Item removed successfully!!")
		} else {
			toast.error(data.message || data.statusMsg)
		}
		// setting new cart
		const newCart = await getUserCart()
		dispatch({ type: "SET_CART", payload: newCart })
		dispatch({ type: "STOP_LOADING" })
	}
	// update cart product quantity
	async function handleUpdateCart(productId: string, count: number) {
		await updateCartProductQuantity(productId, count)
		const newCart = await getUserCart()
		dispatch({ type: "SET_CART", payload: newCart })
	}

	// handle clear cart
	async function handleClearCart() {
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