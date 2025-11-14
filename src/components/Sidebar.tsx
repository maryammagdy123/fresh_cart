import { Category } from '@/Interfaces';
import { getAllCategories } from '@/services/api'
import { CategoryResponse } from '@/types';
import React, { useEffect, useState } from 'react'

interface SidebarProp {
	dispatch: (action: any) => void
}
export default function Sidebar({ dispatch }: SidebarProp) {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const catRes: CategoryResponse = await getAllCategories();

			// نضيف "All" في أول المصفوفة
			const allCategory: Category = {
				_id: "all",       // ممكن تحطي أي id وهمي
				name: "All",
				slug: "all",
				image: "",        // ممكن تسيبيها فاضية أو تحطي أي أيقونة
			};

			setCategories([allCategory, ...catRes.data]);
		};

		fetchData();
	}, []);

	return (
		<div className="p-4 border rounded-md shadow-md mb-6">
			<h3 className="font-semibold mb-3">Categories</h3>
			<ul>
				{categories.map((cat) => (
					<li
						key={cat.name}
						className="cursor-pointer mb-2 hover:text-blue-500"
						onClick={() => dispatch({ type: "FILTER_BY_CATEGORY", payload: cat.name })}
					>
						{cat.name}
					</li>
				))}
			</ul>
		</div>
	)
}
