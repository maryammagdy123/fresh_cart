import { Star } from "lucide-react";

export const renderStars = (rating: number) => {
	const stars = []
	const fullStars = Math.floor(rating);
	const halfStars = rating % 1 !== 0;

	for (let i = 0; i < fullStars; i++) {
		stars.push(
			<Star key={i} className="h-5 w-5  fill-yellow-500 text-yellow-500" />
		);

	}

	if (halfStars) {
		stars.push(
			<Star key="halfStar"
				className="h-5 w-5  fill-yellow-500 text-yellow-500"
			/>
		)
	}

	const emptyStars = 5 - Math.ceil(rating)
	for (let i = 0; i < emptyStars; i++) {
		stars.push(
			<Star key={`empty ${i}`}
				className="h-5 w-5 text-gray-300" />
		)

	}

	return stars;
}