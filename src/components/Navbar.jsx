import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, loadCityFromStorage } from '../features/slices/apiFetchSlice';
import { toggleTheme } from '../features/slices/themeSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoading, city, error } = useSelector((state) => state.city)
  const [searchedCity, setSearchedCity] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const dropdownRef = useRef(null)

  useEffect(() => {
    dispatch(loadCityFromStorage());
  }, [dispatch])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchedCity.length < 2) {
        setSuggestions([])
        return
      }
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=${API_KEY}`
        )
        setSuggestions(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    const delay = setTimeout(fetchSuggestions, 500)
    return () => clearTimeout(delay)
  }, [searchedCity])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([])
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleSelectCity = (cityObj) => {
    dispatch(fetchWeather({ name: cityObj.name }))
    setSearchedCity('')
    setSuggestions([])
  }

  return (
    <header className="sm:p-6 p-2 py-4 flex gap-4 items-center justify-between bg-base-200 w-[100%] z-500 fixed shadow">
      <span className='flex gap-4 items-center sm:justify-start justify-between w-full'>

        <span className='flex items-center'>
          <button className="btn w-10 p-2 sm:hidden flex" onClick={() => navigate('/map-picker')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </button>
          <h1 className="sm:text-2xl font-bold shrink-0 mr-2 cursor-pointer" onClick={() => navigate('/')}>
            🌤️ Weather App
          </h1>
        </span>

        <div className="relative sm:w-80 " ref={dropdownRef}>
          <input
            type="text"
            placeholder='search about city...'
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
            className="input input-bordered w-full"
          />

          {suggestions.length > 0 && (
            <ul className="absolute mt-1 bg-base-100 border rounded-lg shadow-md w-full z-50">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-3 py-2 cursor-pointer hover:bg-base-200"
                  onClick={() => handleSelectCity(s)}
                >
                  {s.name}, {s.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </span>

      <button
        className="btn btn-primary sm:flex hidden"
        onClick={() => dispatch(toggleTheme())}
      >
        theme
      </button>
    </header>
  )
}

export default React.memo(Navbar)
