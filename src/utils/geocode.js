const request = require('postman-request')

const geoCode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoicm9raWJoYXNzYW4iLCJhIjoiY2tycHpnZmJiMmlpMjJydGp0ZG0yZXZ4aCJ9.B38KgLlNcfKcixoNi5qTmQ'
    request({url: mapBoxUrl, json: true}, (error, { body } = {}) =>{
        if(error) {
            callback('Unable to connect to Geocoding Service!', undefined)
        } else if(body.features) {
            if(body.features.length > 0) {
                callback(undefined, {
                    "Latitude": body.features[0].center[1],
                    "Longitude": body.features[0].center[0],
                    "PlaceName": body.features[0].place_name
                })
            } else {
                callback('Location not found!', undefined)
            }
        } else {
            callback(body.message, undefined)
        }
    })
}

module.exports = geoCode