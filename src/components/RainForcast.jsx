import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useSelector } from "react-redux";

function RainForecast() {
    const { city } = useSelector((state) => state.city);

    // نحول البيانات من API لشكل مناسب للرسم
    const data = city?.list?.slice(0, 8).map((item) => {
        const date = new Date(item.dt_txt);
        const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return {
            time,
            rain: item?.rain?.["3h"] || 0, // كمية المطر
        };
    }) || [];

    return (
        <div className="p-4 bg-base-200 md:rounded-lg shadow w-full">
            <h2 className="text-lg font-bold mb-2">Rain Forecast (mm)</h2>
            <ResponsiveContainer width="100%" height={300} cursor={false} className='outline-none focus:outline-none'>
                <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis unit=" mm" />
                    <Line
                        type="monotone"
                        dataKey="rain"
                        stroke="#1E90FF"
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="rain" stroke="#1E90FF" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default React.memo(RainForecast);
