"use client"
import CartContextProvider from '@/Context/CartContext'
import WishlistContextProvider from '@/Context/WishListContext'
import QueryProvider from '@/providers/QueryProvider'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

export default function ProvidersContainer({ children }: { children: ReactNode }) {
	return (


		<QueryProvider>
			<SessionProvider >
				<Provider store={store}>
					<WishlistContextProvider>
						<CartContextProvider>
							{children}
						</CartContextProvider>
					</WishlistContextProvider>
				</Provider>
			</SessionProvider>
		</QueryProvider>
	)
}
