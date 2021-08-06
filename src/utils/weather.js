const request = require('postman-request')

const weatherResp = (latitude, longitude, location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8394acde58168ca866ca1009151a295e&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to Weather Service!', undefined)
        } else if(body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is ' + body.current.precip * 100 + '% chance of rain.')
        }   
    })
}

module.exports = weatherResp