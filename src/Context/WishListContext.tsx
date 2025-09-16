"use client"
import { getWishlist } from '@/services/api';
import { Dispatch, SetStateAction, useEffect } from 'react'
import { createContext, ReactNode, useState } from "react";

export const WishlistContext = createContext<{ wishListCount: number; setWishlistCount: Dispatch<SetStateAction<number>>, isLoading: boolean }>(({
	wishListCount: 0,
	setWishlistCount: () => { },
	isLoading: true
})
)

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
	const [wishListCount, setWishlistCount] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	async function getWishList() {
		setIsLoading(true)
		const res = await getWishlist()
		setWishlistCount(res.count)
		setIsLoading(false)
	}

	useEffect(() => {
		getWishList()
	}, [])

	return (
		<WishlistContext.Provider value={{ wishListCount, setWishlistCount, isLoading }}>{children}</WishlistContext.Provider>
	)
}
