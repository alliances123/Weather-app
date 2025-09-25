import React from 'react'
import Present from '../components/Present'
import WeatherPage from './WeatherPage'

function HomePage() {
  return (
    <div className='relative top-[88px] min-h-screen lg:grid lg:grid-cols-6 flex flex-col justify-center lg:items-start items-center'>
      {/* <Present /> */}
      <WeatherPage />
    </div>
  )
}

export default HomePage
