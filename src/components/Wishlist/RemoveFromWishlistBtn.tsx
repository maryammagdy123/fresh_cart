"use client"
import { useState } from 'react'
import { Button } from '../ui/button'

import React from 'react';
import { Loader2 } from 'lucide-react';
import { UseMutationResult } from '@tanstack/react-query';
import { UpdateWishListResponse } from '@/Interfaces';
interface RemoveFromWishlistBtnProps {
	id: string
	handleRemoveFromWishList: UseMutationResult<UpdateWishListResponse, Error, string, unknown>
}
export default function RemoveFromWishlistBtn({ id, handleRemoveFromWishList }: RemoveFromWishlistBtnProps) {
	const [isDelete, setIsDelete] = useState(false)

	return (
		<Button
			onClick={() => {
				setIsDelete(true)
				handleRemoveFromWishList.mutate(id, {
					onSettled: () => setIsDelete(false),
				})
			}}
			disabled={isDelete}
			className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
		>
			{
				isDelete && <Loader2 className='animate-spin' />
			}
			Remove
		</Button>
	)
}
