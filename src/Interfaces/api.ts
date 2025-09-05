export interface ApiResponse<T> {
	results: number
	metadata: {
		currentPage: number
		numberOfPages: number
		limit: number
		nextPage: number
	};
	data: T[]
}

