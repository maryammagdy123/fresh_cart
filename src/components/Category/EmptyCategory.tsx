import { Ban } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function EmptyCategory() {
	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<div className="bg-blue-100 rounded-full p-6 mb-6">
				<Ban className="h-12 w-12 text-blue-500" />
			</div>
			<h2 className="text-2xl font-semibold mb-2 text-gray-700">
				No Products Available
			</h2>
			<p className="text-gray-500 mb-6">
				We couldn’t find any products for this category right now.
			</p>
			<Link
				href="/categories"
				className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
			>
				Browse Other Categories
			</Link>
		</div>
	)
}
