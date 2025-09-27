import React, { useEffect } from 'react'
import WeatherCard from '../components/WeatherCard.jsx';
import AddCity from '../components/AddCity.jsx';
import Details from '../components/Details.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Highlights from '../components/Highlights.jsx';
import RainForecast from '../components/RainForcast.jsx';
import Test from '../components/Test.jsx';

function WeatherPage() {
    const dispatch = useDispatch();
    const { isLoading, city } = useSelector((state) => state.city)
    const temp = city?.list?.[0]?.main?.temp ? Math.floor(city.list[0].main.temp) : null
    const maxTemp = city?.list?.[0]?.main?.temp_max ? Math.floor(city.list[0].main.temp_max) : null
    const minTemp = city?.list?.[0]?.main?.temp_min ? Math.floor(city.list[0].main.temp_min) : null
    const iconUrl = city?.list?.[0]?.weather?.[0]?.icon
        ? `http://openweathermap.org/img/wn/${city.list[0].weather[0].icon}@2x.png`
        : null

    const currentCity = city?.city

    return (
        <>
            <div className='flex flex-col col-span-4 items-center md:p-5 md:w-auto w-full py-5'>
                <div className='w-full'>
                    <div className='mb-2 px-2 w-full'>
                        <p className='text-gray-400'>current location</p>
                        {!currentCity || currentCity.name === '' ? (<h1>Unknown Country</h1>) : (<h1 className='text-xl'>{currentCity.name},{currentCity.country}</h1>)}
                    </div>
                    <div className='flex w-full'>
                        <WeatherCard />
                        <AddCity />
                    </div>
                    <div className='flex flex-col w-full my-3 px-2'>
                        <h1 className='mt-3'>Highlights</h1>
                        <Highlights />
                    </div>
                    <div className='flex w-full'>
                        <RainForecast />
                    </div>
                    <div className='flex w-full'>
                        <Test />
                    </div>
                </div>
            </div >
            {/* temp sec */}
            < Details />
        </>
    )
}

export default React.memo(WeatherPage)