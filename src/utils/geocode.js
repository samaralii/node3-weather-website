const request = require('request')


const mapBoxToken = 'pk.eyJ1Ijoic2FtYXJhbGlpIiwiYSI6ImNsM2pvYnIxMzAwM20zanFya2hseTRmZnQifQ.be7hl4teM3renDr_w21AlQ'
const getGeoCodingUrl = (search, limit) => 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(search) + '.json?access_token=' + mapBoxToken + '&limit=' + limit


const geocode = (address, callback) => {
    const url =  getGeoCodingUrl(address, 1)
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Mapbox service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            callback(undefined, {
                lat: lat,
                long: long,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode