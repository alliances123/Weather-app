// features/slices/hourlyWeatherSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

const initialState = {
    hourly: [],
    current: null,
    timezoneOffset: 0,
    isLoading: false,
    error: null,
}

export const fetchHourlyWeather = createAsyncThunk(
    'weather/fetchHourlyWeather',
    async ({ name }) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}&units=metric`);
        return res.data
    }
)

const hourlyWeatherSlice = createSlice({
    name: 'hourlyWeather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHourlyWeather.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchHourlyWeather.fulfilled, (state, action) => {
                state.isLoading = false
                state.current = action.payload.current
                state.hourly = action.payload.hourly
                state.timezoneOffset = action.payload.timezone_offset
            })
            .addCase(fetchHourlyWeather.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export default hourlyWeatherSlice.reducer
