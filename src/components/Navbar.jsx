import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather } from '../features/slices/apiFetchSlice';
import { toggleTheme } from '../features/slices/themeSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoading, city, error } = useSelector((state) => state.city)
  const [suggestions, setSuggestions] = useState([])

  const [searchedCity, setSearchedCity] = useState('') // input value
  const [fetchedCities, setFetchedCities] = useState([]) // data from db => map
  const [fetchSearchedCity, setFetchSearchedCity] = useState() // posted name

  const dropdownRef = useRef(null)

  // get
  useEffect(() => {
    const fetchDb = async () => {
      try {
        const res = await axios.get('http://localhost:3001/countries')
        const data = res.data
        setFetchedCities(data)
        return data
      } catch (err) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchDb()
  }, [])

  // post
  const postNewDb = async (name) => {
    if (!name) return;
    try {
      const res = await axios.post('http://localhost:3001/countries', {
        countryName: name,
        lat: null,
        lon: null,
      })
      setFetchedCities(prev => [...prev, res.data])
      return res.data
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setSearchedCity('')
    }
  }

  useEffect(() => {
    console.log('=============')
    console.log(fetchedCities)
  }, [fetchedCities])

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
    dispatch(fetchWeather({ name: cityObj.name })) // communicate with api => db
    setSearchedCity('')
    // setSuggestions([])
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
          <h1 className="sm:text-2xl font-bold shrink-0 mr-2 cursor-pointer flex items-center" onClick={() => navigate('/')}>
            <span className='sm:flex hidden'>
              🌤️
            </span>
            Weather App
          </h1>
          <button className="btn p-2 sm:flex hidden" onClick={() => navigate('/map-picker')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <h1>
              {city ? city.city.name : 'choose a country'}
            </h1>
          </button>
        </span>

        <div className="relative sm:w-80 flex" ref={dropdownRef}>
          <input
            type="text"
            placeholder='search about city...'
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
            className="input rounded-l-lg rounded-r-none input-bordered w-full"
          />
          {/* 
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
          )} */}
          <button onClick={() => postNewDb(searchedCity)} className='p-3 bg-primary rounded-r-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </span>

      <button
        className="btn btn-primary sm:flex hidden"
        onClick={() => dispatch(toggleTheme())}
      >
        theme
      </button>
    </header >
  )
}

export default React.memo(Navbar)
