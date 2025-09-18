"use client"
import { useState } from "react";


export function useStepper(initial = 0) {
	const [step, setStep] = useState(initial);

	const next = () => setStep((prev) => prev + 1);
	const back = () => setStep((prev) => Math.max(0, prev - 1));
	const reset = () => setStep(initial);

	return { step, next, back, reset };
}
