"use client"
import { Box, Stepper, Step, StepLabel } from "@mui/material";

import { forgetPassword, resetPassword, verifyCode } from "@/services/api";
import React from "react";
import EmailStep from "@/components/ForgetPassword/EmailStep";
import CodeStep from "@/components/ForgetPassword/CodeStep";
import PasswordStep from "@/components/ForgetPassword/PasswordStep";
import toast from "react-hot-toast";
import { useStepper } from "@/Hooks/useStepper";
import { CodeFormValues, EmailFormValues, PasswordFormValues } from "@/schemas/forgetPassword";
import { useRouter } from "next/navigation";

const steps = ["Enter Email", "Verify Code", "New Password"];

export default function ForgotPassword() {
	const { step: activeStep, next, back } = useStepper(0);
	const [loading, setLoading] = React.useState(false);

	const router = useRouter()

	async function handleEmail(values: EmailFormValues) {
		setLoading(true);
		try {
			const res = await forgetPassword(values);
			if (res.statusMsg === "success") {
				toast.success("Code sent");
				next();
			} else toast.error(res.message);
		} finally {
			setLoading(false);
		}
	}


	async function handleCode(values: CodeFormValues) {
		setLoading(true);
		try {
			const res = await verifyCode(values);
			if (res.status === "Success") {
				toast.success("Password reset");
				next();
			} else toast.error(res.status);
		} finally {
			setLoading(false);
		}

	}

	async function handlePassword(values: PasswordFormValues) {
		setLoading(true);
		try {
			const res = await resetPassword(values);
			if (res.token) {
				toast.success("Password reset");
				console.log(res)
				router.push("/login");
			} else {
				console.log(res)
			}
		} finally {
			setLoading(false);
		}
	}

	function renderStepContent() {
		switch (activeStep) {
			case 0:
				return <EmailStep loading={loading} onSubmit={handleEmail} />;
			case 1:
				return <CodeStep loading={loading} onSubmit={handleCode} onBack={back} />;
			case 2:
				return (
					<PasswordStep
						loading={loading}
						onSubmit={handlePassword}
						onBack={back}
					/>
				);
			default:
				return <p className="text-green-600">✅ Password Reset Complete</p>;
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
				<h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
					Reset your password
				</h1>
				<Box sx={{ width: "100%", maxWidth: 420, mx: "auto", mt: 6 }}>
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					<Box sx={{ mt: 4 }}>{renderStepContent()}</Box>
				</Box>
			</div>

		</div>

	);
}
