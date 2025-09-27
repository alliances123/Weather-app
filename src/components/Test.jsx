import React, { useEffect, useState } from "react"

function Test() {
    const [cities, setCities] = useState([])

    useEffect(() => {
        fetch("/api/cities")
            .then(res => res.json())
            .then(data => setCities(data.cities))
    }, [])

    return (
        <div>
            <h2>Cities</h2>
            <ul>
                {cities.map(city => (
                    <li key={city.id}>{city.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Test
