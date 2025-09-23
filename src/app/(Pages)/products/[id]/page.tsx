import { Metadata } from "next";
import { getSingleProduct } from "@/services/api";
import ProductDetailPage from "../../../../components/Product/ProductDetailPage";



type Props = {
	params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.id;
	const product = await getSingleProduct(id);

	return {
		title: product.data.title,
		description: product.data.description || "Check out this product",
		openGraph: {
			title: product.data.title,
			description: product.data.title,

		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params;
	const product = await getSingleProduct(id);
	return <ProductDetailPage productData={product.data} />;
}
