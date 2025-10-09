import EmptyOrders from '@/components/Orders/EmptyOrders'
import { Button } from '@/components/ui/button'
import { userId } from '@/helpers/getUserToken'
import { UserOrderResponse } from '@/Interfaces/order'

import { getUserOrders } from '@/services/api'

import Image from 'next/image'
import React from 'react'

export default async function OrdersPage() {

	const id = await userId()

	const orders: UserOrderResponse[] = await getUserOrders(id);

	if (!orders || orders.length === 0) {
		return <EmptyOrders />;
	}
	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">My Orders</h1>

			<div className="space-y-6">
				{orders.map(order => (
					<div
						key={order._id}
						className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
					>
						{/* Header */}
						<div className="flex flex-wrap justify-between items-center mb-4">
							<div>
								<p className="text-sm text-gray-500">
									Order ID: <span className="font-medium">{order._id}</span>
								</p>
								<p className="text-sm text-gray-400">
									{new Date(order.createdAt).toLocaleString()}
								</p>
								<p className="text-lg font-semibold mt-1">
									Total: ${order.totalOrderPrice}
								</p>
							</div>

							<div className="flex gap-2 mt-2 sm:mt-0">
								<span
									className={`px-3 py-1 text-xs rounded-full ${order.isPaid
										? 'bg-green-100 text-green-700'
										: 'bg-red-100 text-red-700'
										}`}
								>
									{order.isPaid ? 'Paid' : 'Unpaid'}
								</span>

								<span
									className={`px-3 py-1 text-xs rounded-full ${order.isDelivered
										? 'bg-green-100 text-green-700'
										: 'bg-gray-100 text-gray-700'
										}`}
								>
									{order.isDelivered ? 'Delivered' : 'Pending'}
								</span>

								<span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
									{order.paymentMethodType === 'card' ? 'Card' : 'Cash'}
								</span>
							</div>
						</div>

						{/* Products Preview */}
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
							{order.cartItems.map(item => (
								<div
									key={item._id}
									className="flex items-center gap-3 border rounded-lg p-3 hover:bg-gray-50"
								>
									<div className="relative w-16 h-16 flex-shrink-0">
										<Image
											src={item.product.imageCover ?? "s"}
											alt={item.product.title}
											fill
											sizes="64px"
											className="rounded-md object-cover border"
										/>
									</div>

									<div className="flex-1">
										<p className="text-sm font-medium">{item.product.title}</p>
										<p className="text-xs text-gray-500">
											Qty: {item.count} × EGP{item.price}
										</p>
										<p className="text-xs text-gray-400">
											Brand: {item.product.brand.name}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Action Button */}
						<div className="mt-4 text-right">
							<Button className="bg-black text-white hover:bg-gray-800 text-sm">
								View Details
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
