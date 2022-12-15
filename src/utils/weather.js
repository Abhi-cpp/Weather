const request = require('request')


const weather = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9d82439980b0235e4ec9a4258973174f&query=" + location.latitude + "," + location.longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        }
        else if (body.error) {
            callback("Unable to find location.", undefined)
        }
        else {
            const data = body.current
            callback(undefined, (data.weather_descriptions[0] + ". It is currently " + data.temperature + " degree out.It feels like " + data.feelslike + " degress out."))
        }

    })
}

module.exports = weather