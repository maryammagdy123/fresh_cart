import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./slices/CounterSlice";

export const store = configureStore({
	reducer: { counter: CounterReducer }
})