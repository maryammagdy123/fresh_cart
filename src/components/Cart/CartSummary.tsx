import React from 'react'
import { Button } from '../ui/button'
interface CartSummaryProps {
	totalprice: number
}
export default function CartSummary({ totalprice }: CartSummaryProps) {
	return (
		<aside className="bg-white rounded-2xl shadow-sm border p-6 h-fit">
			<h3 className="text-xl font-semibold mb-4">Order Summary</h3>
			<div className="flex justify-between mb-2 text-gray-600">
				<span>Subtotal</span>
				<span>${totalprice}</span>
			</div>
			<div className="flex justify-between mb-2 text-gray-600">
				<span>Shipping</span>
				<span className='text-green-500'>Free</span>
			</div>
			<div className="flex justify-between text-lg font-bold border-t pt-3">
				<span>Total</span>
				<span>${totalprice}</span>
			</div>
			<Button className="w-full mt-6">Checkout</Button>
		</aside>
	)
}
