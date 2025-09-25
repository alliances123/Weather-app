import React, { useEffect } from 'react'
import ChanceHourly from './ChanceHourly'
import HourlyRain from './RainChart'
import { loadCityFromStorage } from '../features/slices/apiFetchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion";

function Details() {
    const { city } = useSelector((state) => state.city)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCityFromStorage())
    }, [])

    return (
        <div className='bg-base-300 h-full col-span-2 p-3 shadow-md max-w-[820px] w-full'>
            <div className='p-5'>
                <HourlyRain list={city?.list || []} />
            </div>
            <div className='md:p-5'>
                <ChanceHourly />
            </div>
        </div>
    )
}

export default React.memo(Details)
