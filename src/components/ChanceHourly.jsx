import React, { useEffect } from 'react'
import { fetchHourlyWeather } from '../features/slices/hourlyWeatherSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { loadCityFromStorage } from '../features/slices/apiFetchSlice.js';
import { motion } from "framer-motion";

function ChanceHourly() {
    const { city } = useSelector((state) => state.city)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCityFromStorage());
    }, [dispatch])

    useEffect(() => {
        if (city?.city?.name) {
            dispatch(fetchHourlyWeather({ name: city.city.name }));
        }
    }, [dispatch, city]);

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 max-h-130 overflow-auto">
                {city?.list ? (
                    Object.values(
                        city.list.reduce((groups, item) => {
                            const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                            });

                            if (!groups[date]) {
                                groups[date] = [];
                            }
                            groups[date].push(item);
                            return groups;
                        }, {})).map((dayGroup, index) => {
                            const dayName = new Date(dayGroup[0].dt_txt).toLocaleDateString("en-US", {
                                weekday: "long",
                            });
                            const icon = dayGroup[0].weather[0].icon;
                            const description = dayGroup[0].weather[0].description;
                            const temps = dayGroup.map((it) => it.main.temp);
                            const maxTemp = Math.max(...temps);
                            const minTemp = Math.min(...temps);
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <div className="p-3 rounded-lg shadow grid grid-cols-2 bg-base-100 px-4">
                                        <span className='flex items-center justify-center bg-primary rounded-lg'>
                                            <p className='flex justify-center items-center gap-2 sm:text-xl'>
                                                <span className='flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                                    </svg>
                                                    {Math.round(minTemp)}
                                                </span>
                                                |
                                                <span className='flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                                    </svg>

                                                    {Math.round(maxTemp)}
                                                </span>
                                                °C
                                            </p>
                                        </span>
                                        <span className='flex items-center justify-start'>
                                            <span>
                                                <img
                                                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                                                    alt="icon"
                                                />
                                            </span>
                                            <span>
                                                <p className="font-bold">{dayName}</p>
                                                <p>{description}</p>
                                            </span>
                                        </span>
                                    </div>
                                </motion.div>

                            );
                        })
                ) : (
                    <p>Loading...</p>
                )}


            </div>
        </div>
    )
}

export default React.memo(ChanceHourly)
