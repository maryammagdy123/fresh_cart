"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function CheckOut() {
	const { cartID } = useParams()

	return (
		<div>check</div>
	)
}
