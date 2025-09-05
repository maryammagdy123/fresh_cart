import React from 'react'

export default function LoadingSpinner() {
	return (
		<div>
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="h-12 w-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
				<div className='text-center my-2'>
					<h1 className='text-3xl font-bold'>Loading</h1>
					<p className='text-gray-400 mt-3'>Please wait while we load you content...</p>
				</div>
			</div>
		</div>
	)
}
