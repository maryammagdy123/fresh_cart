import { createSlice } from "@reduxjs/toolkit";



const initialState = {
	count: 0
}
const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {}
})

export const CounterReducer = counterSlice.reducer