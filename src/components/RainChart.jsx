import { motion } from "framer-motion";
import React from "react";

function HourlyRain({ list = [] }) {
    if (!Array.isArray(list) || list.length === 0) {
        return <p>No rain data available</p>
    }

    // بناخد بيانات النهاردة بس
    const today = new Date().getDate()
    const todayForecast = list.filter(item => new Date(item.dt_txt).getDate() === today)

    if (todayForecast.length === 0) {
        return <p>No data for today</p>
    }

    return (
        <div className="space-y-4">
            <h1 className="py-3 text-xl">chance of rain</h1>
            {todayForecast.map((item, idx) => {
                const time = new Date(item.dt_txt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
                const rain = item.rain?.["3h"] || 0
                return (
                    <div key={idx} className="flex items-center">
                        <div className="flex justify-between mb-1">
                            <span className="shrink-0">{time}</span>
                        </div>
                        <div className="w-full bg-base-100 rounded h-2 ml-10">
                            <motion.div
                                key={idx}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(rain * 20, 100)}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div
                                    className="bg-primary h-2 rounded"
                                    style={{ width: `${Math.min(rain * 20, 100)}%` }} // 5mm = 100%
                                />
                            </motion.div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(HourlyRain)
