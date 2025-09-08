import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartList() {
	return (
		<div
			// key={item.id}
			className="flex gap-4 p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
		>
			{/* product image */}
			<div className="relative w-28 h-28 shrink-0">
				{/* <Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover rounded-xl"
								/> */}
			</div>

			{/* product info */}
			<div className="flex-1 flex flex-col justify-between">
				<div>
					<h2 className="font-semibold text-lg">item.title</h2>
					<p className="text-sm text-gray-500">item.category</p>
					<p className="text-primary font-bold mt-1">$item price</p>
				</div>

				{/* quantity controls */}
				<div className="flex items-center gap-3 mt-3">
					<Button
						variant="outline"
						size="icon"

					>
						<Minus className="h-4 w-4" />
					</Button>
					<span className="w-6 text-center">item.qty</span>
					<Button
						variant="outline"
						size="icon"

					>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* right side: total + remove */}
			<div className="flex flex-col justify-between items-end">
				<p className="font-semibold">$item.price * item.qty</p>
				<Button
					variant="destructive"
					size="icon"

				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
