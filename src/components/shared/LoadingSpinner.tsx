import React from 'react'

export default function LoadingSpinner() {
	return (
		<div>
			<div className="flex items-center justify-center min-h-screen">
				<div className="h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		</div>
	)
}
