"use client";

import RegisterForm from "@/components/Form/RegisterForm";
export default function RegisterPage() {



	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
				<h1 className="text-2xl font-bold mb-1 text-center">Register</h1>
				<p className="text-gray-400 mb-6 text-center">Register now to browse our products</p>

				<RegisterForm />
			</div>
		</div>
	);
}
