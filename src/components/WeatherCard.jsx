import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

const API_KEY = import.meta.env.VITE_PEXELS_API;
const BASE_URL = "https://api.pexels.com/v1/search";

const fetchCityImage = async (name) => {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: API_KEY,
            },
            params: {
                query: name,
                per_page: 1,
            },
        });
        return res.data.photos[0]?.src?.medium;
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};

const API_CITY_KEY = import.meta.env.VITE_API_KEY;

const fetchCityList = async (cityName) => {
    try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
                q: cityName,
                appid: API_CITY_KEY,
                units: "metric"
            },
        });
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};


function WeatherCard() {

    const [countries, setCountries] = useState([]);
    const [images, setImages] = useState({});
    const [imagesTwo, setImagesTwo] = useState({});
    const { city } = useSelector((state) => state.city);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get("http://localhost:3001/countries");
                const data = res.data;
                setCountries(data);
                data.forEach(async (c) => {
                    const img = await fetchCityImage(c.countryName);
                    const city = await fetchCityList(c.countryName);
                    setImages((prev) => ({ ...prev, [c.id]: img }));
                    setImagesTwo((prev) => ({ ...prev, [c.id]: img }));
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchCountries();
    }, []);

    if (!city || !city.list) {
        return (
            <div className="md:rounded-2xl md:h-80 aspect-video overflow-hidden relative flex md:col-span-2 w-full
             md:my-0 my-3 items-center justify-center bg-gray-200">
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {countries?.map((c) => (
                <div
                    key={c.id}
                    className='flex'
                >
                    <div
                        className="rounded-2xl overflow-hidden shadow-lg gap-10"
                    >
                        <img
                            src={
                                images[c.id] ||
                                "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            alt={c.countryName}
                            className="w-full h-48 object-cover"
                        />


                        <div className="p-3">
                            <h1 className="text-lg font-semibold">{c.countryName}</h1>
                        </div>
                    </div>

                    <div className='bg-red-500'>
                        <img
                            src={
                                imagesTwo[c.id] ||
                                "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            alt={c.countryName}
                            className="w-full my-3 object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default React.memo(WeatherCard);
