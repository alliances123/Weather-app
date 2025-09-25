import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

const initialState = {
    city: null,
    isLoading: false,
    error: null,
}

export const fetchWeather = createAsyncThunk(
    'fetch/apiFetchSlice',
    async ({ name }) => {
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}&units=metric`
        )
        return res.data
    }
)

const apiFetchSlice = createSlice({
    name: 'apiFetchSlice',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload
            localStorage.setItem('city', JSON.stringify(state.city))
        },
        loadCityFromStorage: (state) => {
            const cached = localStorage.getItem('city')
            if (cached) {
                state.city = JSON.parse(cached)
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.isLoading = false
                state.city = action.payload
                localStorage.setItem('city', JSON.stringify(state.city))
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.response?.data?.message || action.error.message
            })
    },
})

export const { setCity, loadCityFromStorage } = apiFetchSlice.actions
export default apiFetchSlice.reducer
