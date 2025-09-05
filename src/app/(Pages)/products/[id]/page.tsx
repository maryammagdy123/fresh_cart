"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function ProductDetails() {
	const { id } = useParams()
	return (
		<div>Product id : {id}</div>
	)
}
