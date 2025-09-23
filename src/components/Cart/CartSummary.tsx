import React from 'react'
import { Button } from '../ui/button'
import { GetCartResponse } from '@/Interfaces'
import Link from 'next/link'
interface CartSummaryProps {
	cart: GetCartResponse
}
export default function CartSummary({ cart }: CartSummaryProps) {
	return (
		<aside className="bg-white rounded-2xl shadow-sm border p-6 h-fit">
			<h3 className="text-xl font-semibold mb-4">Order Summary</h3>
			<div className="flex justify-between mb-2 text-gray-600">
				<span>Subtotal</span>
				<span>${cart.data.totalCartPrice}</span>
			</div>
			<div className="flex justify-between mb-2 text-gray-600">
				<span>Shipping</span>
				<span className='text-green-500'>Free</span>
			</div>
			<div className="flex justify-between text-lg font-bold border-t pt-3">
				<span>Total</span>
				<span>${cart.data.totalCartPrice}</span>
			</div>
			<Button variant={'outline'} className="w-full mt-6">
				<Link className=' text-black' href={`/checkout/${cart.data._id}`}>Order checkout</Link>
			</Button>
			<Button className="w-full mt-6">continue shopping</Button>
		</aside >
	)
}
