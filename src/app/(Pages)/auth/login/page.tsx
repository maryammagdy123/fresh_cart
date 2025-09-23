
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/Form/LoginForm";







export default function LoginPage() {




	return (
		<Suspense fallback={<LoadingSpinner />}>
			<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
				<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
					{/* Header */}
					<h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
						Welcome Back
					</h1>
					<p className="text-gray-500 text-center mb-8">
						Login to continue shopping and explore your favourite products
					</p>

					{/* Form */}
					<LoginForm />

					{/* Footer */}
					<div className="flex justify-between items-center mt-6 text-sm">
						<Link
							href="/forgotpassword"
							className="text-blue-600 hover:underline hover:text-blue-800"
						>
							Forgot Password?
						</Link>

						<p className="text-gray-500">
							Don&apos;t have an account?{" "}
							<Link
								href="/auth/register"
								className="text-blue-600 hover:underline hover:text-blue-800"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div></Suspense>
	);
}
