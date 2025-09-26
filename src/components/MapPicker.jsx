import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, loadCityFromStorage, setCity } from '../features/slices/apiFetchSlice';
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker({ setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
    });
    return null;
}

function MapPicker() {
    const { city } = useSelector((state) => state.city)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [position, setPosition] = useState(city?.city?.coord ? { lat: city.city.coord.lat, lng: city.city.coord.lon } : null);

    useEffect(() => {
        dispatch(loadCityFromStorage());
    }, [dispatch])

    useEffect(() => {
        if (city?.city?.coord) {
            setPosition({ lat: city.city.coord.lat, lng: city.city.coord.lon });
        }
    }, [city]);

    return (
        <div className="relative">
            <MapContainer
                // center={[30.0444, 31.2357]}
                center={position ? position : [30.0444, 31.2357]}
                // zoom={5}
                zoom={position ? 5.5 : 3}
                minZoom={2}
                style={{ height: "100vh", width: "100%" }}
                zoomControl={false}
                maxBounds={[
                    [-90, -180], // جنوب غرب (أقصى زاوية)
                    [90, 180]    // شمال شرق (أقصى زاوية)
                ]}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setPosition={setPosition} />
                {position && <Marker position={position}></Marker>}
            </MapContainer>

            {position && (
                <p className="mt-4 absolute bottom-3 left-2 z-500 text-black">
                    📍 الإحداثيات: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
                </p>
            )}
            <button className="btn absolute bottom-3 right-2 z-500"
                onClick={() => {
                    if (position) {
                        dispatch(fetchWeather({ lat: position.lat, lon: position.lng }));
                        navigate('/')
                    }
                }}>
                search
            </button>
        </div >
    );
}

export default React.memo(MapPicker)