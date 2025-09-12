"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Grid2x2 } from "lucide-react";
import { apiServices } from "@/services/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryResponse, SubcategoryResponse } from "@/types";
import { Category, Subcategory } from "@/Interfaces";
import Link from "next/link";



export default function BrowseByCategory() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
	const [openCategory, setOpenCategory] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const catRes: CategoryResponse = await apiServices.getAllCategories();
			const subRes: SubcategoryResponse =
				await apiServices.getAllSubcategories();

			setCategories(catRes.data);
			setSubcategories(subRes.data);
		};

		fetchData();
	}, []);

	return (
		<div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
			{/* Sidebar */}
			<aside className="bg-white rounded-2xl shadow-md p-5 h-fit border border-gray-100">
				<h3 className="font-semibold text-lg mb-4">Categories</h3>
				<nav className="space-y-2">
					{categories.map((cat) => (
						<div key={cat._id} className="border-b border-gray-100 pb-2">
							<Button
								variant={"outline"}
								className="w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition"
								onClick={() =>
									setOpenCategory(openCategory === cat._id ? null : cat._id)
								}
							>
								<span className="text-sm font-medium">{cat.name}</span>
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform ${openCategory === cat._id ? "rotate-180" : ""
										}`}
								/>
							</Button>
							<div
								className={`overflow-hidden transition-all duration-300 ease-in-out ${openCategory === cat._id ? "max-h-40 mt-2" : "max-h-0"
									}`}
							>
								<div className="pl-4 space-y-1">
									{subcategories
										.filter((sub) => sub.category === cat._id)
										.map((sub) => (
											<Link href={`/categories/${sub._id}`} key={sub._id}>
												<Button
													variant={"outline"}
													key={sub._id}
													className="block w-full text-left text-xs text-gray-600 hover:text-black transition"
												>
													{sub.name}
												</Button>
											</Link>
										))}
								</div>
							</div>
						</div>
					))}
				</nav>
			</aside>

			{/* Main Content */}
			<main className="md:col-span-3">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-bold">Browse by Category</h2>
						<p className="text-gray-500 text-sm">
							Select a category to view its subcategories and products.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							Sort: Popular
						</Button>
						<Button variant="outline" size="sm">
							<Grid2x2 className="h-4 w-4 mr-1" />
							Grid View
						</Button>
					</div>
				</div>

				{/* Category Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((cat) => (
						<Link href={`/categories/${cat._id}`} key={cat._id}>
							<div

								className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 p-4 flex flex-col items-center text-center"
							>
								<div className="relative h-24 w-24 mb-3">
									<Image
										src={cat.image}
										alt={cat.name}
										fill
										className="rounded-xl object-cover"
									/>
								</div>
								<h4 className="font-medium text-base">{cat.name}</h4>
							</div>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
