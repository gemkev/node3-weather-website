const request = require('request')


const forecast = (lat, long, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=c967373a7d66b8b36dee8d2f03a9785f&query=${lat},${long}`
    const celsius = true
    url = ! celsius ? url += '&units=f' : url
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        }  else if(body.error) {
            callback(body.error.info, undefined)
        }
        else{
            const {temperature, feelslike, weather_descriptions, humidity, uv_index} = body.current
            callback(undefined, `The weather is ${weather_descriptions[0].toLowerCase()}. It is currently ${temperature}, and feels like ${feelslike}. The humidity is ${humidity}%, and UV index is ${uv_index}.`)
        }
    })
}
module.exports = forecast


