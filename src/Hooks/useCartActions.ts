import React, { useCallback, useContext, useEffect, useState } from 'react'
import { cartContext } from '@/Context/CartContext'
import { GetCartResponse } from '@/Interfaces'
import { clearCart, deleteCartItem, getUserCart, updateCartProductQuantity } from '@/services/api'
import toast from 'react-hot-toast'

export default function useCartActions(initialCart: GetCartResponse) {
	const [cart, setCart] = useState<GetCartResponse>(initialCart)
	const [isLoading, setIsLoading] = useState(false);
	const { setCartCount } = useContext(cartContext)


	useEffect(() => {
		setCartCount(cart.numOfCartItems)
	}, [cart, setCartCount])

	const refreshCart = useCallback(async () => {
		const newCart = await getUserCart();
		setCart(newCart);
	}, []);
	// delete item from cart
	const handleDeleteCartItem = useCallback(async (productId: string) => {
		try {
			setIsLoading(true);
			const res = await deleteCartItem(productId);
			if (res.statusMsg === "success") toast.success("Item removed successfully!");
			await refreshCart();
		} finally {
			setIsLoading(false);
		}
	}, [refreshCart]);

	const handleUpdateCart = useCallback(async (productId: string, count: number) => {
		await updateCartProductQuantity(productId, count);
		await refreshCart();
	}, [refreshCart]);

	const handleClearCart = useCallback(async () => {
		try {
			setIsLoading(true);
			await clearCart();
			toast.success("Cart cleared!");
			await refreshCart();
		} finally {
			setIsLoading(false);
		}
	}, [refreshCart]);
	return { cart, isLoading, handleDeleteCartItem, handleUpdateCart, handleClearCart };
}
