import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Highlights() {

    const dispatch = useDispatch();
    const { isLoading, city } = useSelector((state) => state.city)


    const sunsetTimeInMSecond = new Date(city?.city.sunset * 1000)
    const sunriseTimeInMSecond = new Date(city?.city.sunrise * 1000)
    const sunset = sunsetTimeInMSecond.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunrise = sunriseTimeInMSecond.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const wind = (city?.list[0].wind.speed * 5 / 18 ?? 0).toFixed(1)
    const humidity = city?.list[0].main.humidity
    const rain = (city?.list[0]?.rain?.["3h"] ?? 0).toFixed(1)

    return (
        <>
            <div className='py-3 grid sm:grid-cols-5 grid-cols-3 w-full gap-2'>
                {/* wind */}
                <span className='p-3 rounded-xl border border-gray-500 flex items-center flex-col'>
                    <span className='text-xs text-gray-300/90 w-full mb-2'>
                        <p>Wind</p>
                    </span>
                    <span className='flex gap-2 text-sm px-7 justify-center'>
                        <span className='shrink-0 '>{wind} km/h</span>
                    </span>
                </span>

                {/* humidity */}
                <span className='p-3 rounded-xl border border-gray-500 flex items-center flex-col'>
                    <span className='text-xs text-gray-300/90 w-full mb-2'>
                        <p>Humidity</p>
                    </span>
                    <span className='flex gap-2 text-sm px-7 justify-center'>
                        <span>{humidity}%</span>
                    </span>
                </span>

                {/* rain */}
                <span className='p-3 rounded-xl border border-gray-500 flex items-center flex-col'>
                    <span className='text-xs text-gray-300/90 w-full mb-2'>
                        <p>Rain</p>
                    </span>
                    <span className='flex gap-2 text-sm px-7 justify-center'>
                        <span>{rain}%</span>
                    </span>
                </span>

                {/* sunset & sunrise */}
                <span className='p-3 rounded-xl border border-gray-500 flex items-center flex-col sm:col-span-2 col-span-3'>
                    <span className='text-xs text-gray-300/90 w-full mb-2'>
                        <p>Sunrise & Sunset</p>
                    </span>
                    <span className='flex gap-5 text-sm px-7'>
                        <span className='flex items-center'>
                            <span className='p-1 mr-2 rounded-full bg-primary text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>

                            </span>
                            {sunset}
                        </span>
                        <span className='flex items-center justify-center'>
                            <span className='p-1 mr-2 rounded-full bg-primary text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                            </span>
                            {sunrise}
                        </span>
                    </span>
                </span>
            </div>
        </>
    )
}

export default Highlights
// export default React.memo(Highlights)
