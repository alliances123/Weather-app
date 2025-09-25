import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, loadCityFromStorage } from '../features/slices/apiFetchSlice';
import { toggleTheme } from '../features/slices/themeSlice';


function Navbar() {

  const dispatch = useDispatch();
  const { isLoading, city } = useSelector((state) => state.city)
  const [searchedCity, setSearchedCity] = useState('')

  useEffect(() => {
    if (searchedCity) {
      dispatch(fetchWeather({ name: searchedCity }));
    }
  }, [dispatch, searchedCity])

  useEffect(() => {
    dispatch(loadCityFromStorage());
  }, [dispatch])

  return (
    <header className="p-6 flex gap-4 items-center justify-between bg-base-200 w-[100%] z-10 fixed shadow">
      <span className='flex gap-4 items-center sm:justify-start justify-between w-full'>
        <h1 className="sm:text-2xl font-bold shrink-0 mr-2">
          <span className='text-xl'>
            🌤️
          </span>
          Weather App
        </h1>

        <button className="btn sm:flex hidden" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          {city?.city?.name || 'choose a country'}
        </button>

        <input
          type="text" value={searchedCity} placeholder={city?.city?.name + '...' || 'choose a country...'} className="input sm:min-w-70"
          onChange={(e) => setSearchedCity(e.target.value)}
        />

        <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-md hidden"
          popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
          <li><a>item</a></li>
        </ul>
      </span>
      <button className="btn btn-primary sm:flex hidden" onClick={() => dispatch(toggleTheme())}>theme</button>
    </header>
  )
}

// export default Navbar
export default React.memo(Navbar)
