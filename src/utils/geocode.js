const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2V2aW5zd2Fsc2giLCJhIjoiY2tjbmZrNjIyMGF2MDM2cnF0NTJnODQwbSJ9.mOMTTcSdQ-UQwkRwL81hqQ&limit=1`

    request({url, json: true}, (error, response) => {
        const {features} = response.body
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if (features.length == 0 ) {
            callback('Sorry, location not found. Please try again!', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1], 
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports =  geocode