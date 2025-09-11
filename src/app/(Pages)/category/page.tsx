import { Category } from '@/Interfaces'
import { apiServices } from '@/services/api'
import { CategoryResponse } from '@/types'
import React from 'react'

export default async function CategoriesPage() {
	const data: CategoryResponse = await apiServices.getAllCategories()
	const categories: Category[] = data.data
	return (
		<div>page</div>
	)
}
