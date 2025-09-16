import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<LoadingSpinner />
		</div>
	);
}