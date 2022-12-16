const request = require('request')
require("dotenv").config()

const weather = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=" + process.env.WEATHERAPI + "&query=" + location.latitude + "," + location.longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        }
        else if (body.error) {
            callback("Unable to find location.", undefined)
        }
        else {
            const data = body.current
            const send = `${data.weather_descriptions[0]}.
            It is currently ${data.temperature} degree out. It fells like ${data.feelslike} degress out.
            Wind speed is ${data.wind_speed} Km/h and ${data.humidity}% humidity`
            callback(undefined, send)
        }

    })
}

module.exports = weather