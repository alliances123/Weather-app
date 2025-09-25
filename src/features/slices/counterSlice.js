import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'before update',
}

const counterSlice = createSlice({
    name: 'print',
    initialState,

    reducers: {
        printer: (state, action) => {
            state.age = action.payload.age
            state.name = action.payload.name
        }
    }
})

export default counterSlice.reducer
export const { printer } = counterSlice.actions