const request = require('request')
require("dotenv").config()

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=" + process.env.GEOCODEAPI + "&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined)
        }
        else if (body.features.length === 0) {
            callback("Unable to find location, Try another search.", undefined)
        }
        else {
            const data = body.features;
            callback(undefined, {
                longitude: data[0].geometry.coordinates[0],
                latitude: data[0].geometry.coordinates[1],
                place: data[0].place_name
            })
        }
    })
}

module.exports = geocode