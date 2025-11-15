import { Action } from '@/reducers/productReducer'
import React from 'react'
import { Input } from './ui/input'

interface SearchbarProps {
	dispatch: (action: Action) => void
}
export default function Searchbar({ dispatch }: SearchbarProps) {
	return (
		<Input
			type="text"
			placeholder="Search products..."
			className="border rounded-md p-2 w-1/2 mx-auto"
			onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
		/>
	)
}
