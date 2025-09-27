import React from 'react'
import { createServer, Model } from 'miragejs'

function makeServer() {

    let server = createServer({
        models: {
            city: Model,
            weather: Model,
        },

        seeds(server) {
            server.create('city', { id: 1, name: 'cairo' })
            server.create('city', { id: 2, name: 'alex' })
            server.create("weather", {
                id: 1,
                cityId: 1,
                temp: 30,
                condition: "sunny"
            })
            server.create("weather", {
                id: 2,
                cityId: 2,
                temp: 25,
                condition: "cloudy"
            })
        },

        routes() {

            this.urlPrefix = "http://localhost:5173"
            this.namespace = "api"

            this.get("/cities", (schema) => schema.cities.all())
            this.get("/weather/:cityId", (schema, request) => {
                let cityId = Number(request.params.cityId)
                return schema.weathers.where({ cityId })
            })

            this.passthrough()
            this.passthrough("https://api.openweathermap.org/**");
            this.passthrough("https://api.pexels.com/**");

        }

    })
    return server
}

export default makeServer
