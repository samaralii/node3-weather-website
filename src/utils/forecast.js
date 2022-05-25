const request = require('request')


const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bf3ff92c1f6b51613214706bfa23e52a&query='+ lat +','+ lon
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out, It feels like ' + body.current.feelslike + ' degrees out')
        }

    })
}

module.exports = forecast