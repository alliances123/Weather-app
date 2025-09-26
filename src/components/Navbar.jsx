import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, loadCityFromStorage } from '../features/slices/apiFetchSlice';
import { toggleTheme } from '../features/slices/themeSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoading, city } = useSelector((state) => state.city)
  const [searchedCity, setSearchedCity] = useState('')

  useEffect(() => {
    dispatch(loadCityFromStorage());
  }, [dispatch])

  const handleSearch = () => {
    if (searchedCity.trim()) {
      dispatch(fetchWeather({ name: searchedCity }));
      setSearchedCity('');
    }
  };

  return (
    <header className="p-6 flex gap-4 items-center justify-between bg-base-200 w-[100%] z-500 fixed shadow">
      <span className='flex gap-4 items-center sm:justify-start justify-between w-full'>
        <h1 className="sm:text-2xl font-bold shrink-0 mr-2 cursor-context-menu" onClick={() => navigate('/')}>
          <span className='text-xl'>
            🌤️
          </span>
          Weather App
        </h1>
        <button className="btn sm:flex hidden" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }} onClick={() => navigate('/map-picker')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          {city?.city?.name || 'choose a country'}
        </button>

        <div className="join">
          <div>
            <label className="input validator join-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder='search about country...'
                value={searchedCity}
                onChange={(e) => setSearchedCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </label>
          </div>
          <button className="btn btn-neutral join-item" onClick={handleSearch} disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-md hidden"
          popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
          <li><a>item</a></li>
        </ul>
      </span>
      <button className="btn btn-primary sm:flex hidden" onClick={() => dispatch(toggleTheme())}>theme</button>
    </header >
  )
}

export default React.memo(Navbar)
