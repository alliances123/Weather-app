import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadCityFromStorage } from '../features/slices/apiFetchSlice.js';
import { fetchHourlyWeather } from '../features/slices/hourlyWeatherSlice.js'
import { fetchWeather } from '../features/slices/apiFetchSlice';

function Test() {
    const [country, setCountry] = useState([])
    const [newCountry, setNewCountry] = useState('');
    const { city } = useSelector((state) => state.city)
    console.log(city)

    const name = city?.city?.name
    const CountryName = city?.city?.country
    const maxTemp = city?.list[0]?.main?.temp_max
    const minTemp = city?.list[0]?.main?.temp_min
    const state = city?.list[0]?.weather?.main
    const description = city?.list[0]?.weather?.description
    const icon = city?.list[0]?.weather?.icon

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3001/countries');
                const data = res.data;
                console.log(data);
                setCountry(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUsers();
    }, []);

    const addUser = async () => {
        if (!newCountry.trim()) return;

        try {
            const res = await axios.post('http://localhost:3001/countries', {
                countryName: newCountry,
                description: ''
            });
            dispatch(fetchWeather({ name: newCountry }));
            setCountry(prev => [...prev, res.data]);
            setNewCountry("");
        } catch (err) {
            console.error("Error adding user:", err);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto border rounded shadow">
            <h2 className="text-xl font-bold mb-4">countries</h2>

            <ul className="mb-4">
                {country.map(country => (
                    <li key={country.id}>{country.countryName}</li>
                ))}
            </ul>

            <div className="flex mb-4">
                <input
                    type="text"
                    value={newCountry}
                    onChange={e => setNewCountry(e.target.value)}
                    className="border p-2 flex-1"
                    placeholder="Add new user"
                />
                <button
                    onClick={addUser}
                    className="bg-blue-500 text-white px-4 ml-2"
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default Test
