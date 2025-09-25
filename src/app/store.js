import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/slices/counterSlice.js'
import fetchReducer from '../features/slices/apiFetchSlice.js'
import themeReducer from '../features/slices/themeSlice.js'
import hourlyReducer from '../features/slices/hourlyWeatherSlice.js'

export const store = configureStore({
    reducer: {
        print: counterReducer,
        city: fetchReducer,
        theme: themeReducer,
        hourly: hourlyReducer,
    },
})
