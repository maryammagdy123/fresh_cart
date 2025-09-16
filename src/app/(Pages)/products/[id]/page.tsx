import { Metadata } from "next";
import { apiServices } from "@/services/api";
import ProductDetailPage from "../../../../components/Product/ProductDetailPage";



type Props = {
	params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const product = await apiServices.getSingleProduct(params.id);

	return {
		title: product.data.title,
		description: product.data.description || "Check out this product",
		openGraph: {
			title: product.data.title,
			description: product.data.description,
			images: product.data.images ? [{ url: product.data.images[0] }] : [],
		},
	};
}

export default async function Page({ params }: Props) {
	const product = await apiServices.getSingleProduct(params.id);
	return <ProductDetailPage productData={product.data} />;
}
