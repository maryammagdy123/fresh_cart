type ProductCardSkeletonProps = {
	viewMode: "grid" | "list";
};

export default function ProductCardSkeleton({ viewMode }: ProductCardSkeletonProps) {
	if (viewMode === "grid") {
		// 🔹 Grid View Skeleton
		return (
			<div className="relative border rounded-2xl shadow-md p-4 flex flex-col justify-between h-full animate-pulse">

				<div className="relative w-full h-48 mb-4 bg-gray-200 rounded-lg"></div>

				<div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>


				<div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>

				<div className="flex flex-col gap-2 mb-2">
					<div className="h-4 w-20 bg-gray-200 rounded"></div>
					<div className="h-4 w-16 bg-gray-200 rounded"></div>
				</div>

				<div className="flex justify-between mb-4">
					<div className="h-5 w-12 bg-gray-200 rounded"></div>
					<div className="h-4 w-10 bg-gray-200 rounded"></div>
				</div>


				<div className="h-10 w-full bg-gray-200 rounded"></div>
			</div>
		);
	}

	// 🔹 List View Skeleton
	return (
		<div className="relative border rounded-2xl shadow-md p-4 flex md:flex-row flex-col items-center gap-6 w-full animate-pulse">

			<div className="relative w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>



			<div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
			<div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
			<div className="h-3 w-3/4 bg-gray-200 rounded"></div>


			<div className="flex gap-4 mt-2">
				<div className="h-4 w-20 bg-gray-200 rounded"></div>
				<div className="h-4 w-12 bg-gray-200 rounded"></div>
			</div>

			<div className="h-4 w-16 bg-gray-200 rounded mt-1"></div>

			<div className="flex justify-between items-center mt-3">
				<div className="h-5 w-12 bg-gray-200 rounded"></div>
				<div className="h-10 w-24 bg-gray-200 rounded"></div>
			</div>
		</div>

	);
}
