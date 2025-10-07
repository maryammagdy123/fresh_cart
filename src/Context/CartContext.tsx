"use client"
import { getUserCart } from '@/services/api';
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { createContext, ReactNode, useState } from "react";

export const cartContext = createContext<{ cartCount: number; setCartCount: Dispatch<SetStateAction<number>>, isLoading: boolean }>(({
	cartCount: 0,
	setCartCount: () => { },
	isLoading: true
})
)

export default function CartContextProvider({ children }: { children: ReactNode }) {
	const [cartCount, setCartCount] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	async function getCart() {
		setIsLoading(true)
		const res = await getUserCart()
		setCartCount(res.numOfCartItems)
		setIsLoading(false)
	}

	useEffect(() => {
		getCart()
	}, [cartCount])

	return (
		<cartContext.Provider value={{ cartCount, setCartCount, isLoading }}>{children}</cartContext.Provider>
	)
}
