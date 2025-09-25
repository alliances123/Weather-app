import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCityFromStorage } from '../features/slices/apiFetchSlice.js';
import axios from "axios";

const API_KEY = import.meta.env.VITE_PEXELS_API
const BASE_URL = "https://api.pexels.com/v1/search";

const fetchCityImage = async (cityName) => {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: API_KEY,
            },
            params: {
                query: cityName,
                per_page: 1,
            },
        });
        return res.data.photos[0]?.src?.medium;
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};

function WeatherCard() {
    const [cityImage, setCityImage] = React.useState(null);
    const dispatch = useDispatch();
    const { city } = useSelector((state) => state.city);

    useEffect(() => {
        if (city?.city?.name) {
            fetchCityImage(city.city.name).then((img) => {
                setCityImage(img)
            });
        }
    }, [city]);

    useEffect(() => {
        dispatch(loadCityFromStorage());
    }, [dispatch]);

    if (!city || !city.list) {
        return (
            <div className="md:rounded-2xl md:h-80 aspect-video overflow-hidden relative flex md:col-span-2 w-full
             md:my-0 my-3 items-center justify-center bg-gray-200">
                <span>Loading...</span>
            </div>
        );
    }

    const firstItem = city.list[0];
    const temp = firstItem?.main?.temp ? Math.floor(firstItem.main.temp) : '-';
    const weather = firstItem?.weather?.[0];
    const iconUrl = weather?.icon
        ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
        : '/placeholder.png';

    const dt = firstItem?.dt_txt;
    const weekday = dt
        ? new Date(dt).toLocaleDateString('en-US', { weekday: 'long' })
        : '';
    const time = dt
        ? new Date(dt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        : '';

    return (
        <div className="md:rounded-2xl md:h-80 aspect-video overflow-hidden relative flex md:col-span-2 w-full md:my-0 my-3">
            <img className='w-full object-cover'
                src={cityImage}
            />
            <span className="w-full h-full bg-black/35 absolute"></span>
            <span className="absolute p-2 w-full flex justify-between items-center">
                <span className="flex items-center gap-2">
                    <img src={iconUrl} className="w-20 aspect-square object-cover" alt="weather icon" />
                    <h1 className="text-[40px]">{temp}</h1>
                    <h1 className="text-[30px]">°C</h1>
                </span>
                <span className="text-right">
                    <span className="flex gap-1">
                        <h1>{weekday},</h1>
                        <h1>{time}</h1>
                    </span>
                    <h1>{weather?.description || '-'}</h1>
                </span>
            </span>
        </div>
    );
}

export default React.memo(WeatherCard);
