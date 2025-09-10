import { createContext, ReactNode } from "react";

export const cartContext = createContext(0)
import React from 'react'

export default function CartContextProvider({ children }: { children: ReactNode }) {

	return (
		<cartContext.Provider value={{}}>{children}</cartContext.Provider>
	)
}
