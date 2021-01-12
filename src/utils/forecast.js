import request from 'request'

const weatherSearch = (latitude, longtitude, callback) => {        
    const url = `http://api.weatherstack.com/current?access_key=b562de99af24e97c84651c6654032910&query=${latitude},${longtitude}&units=m`
            
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather data API')
        } else if (body.error) {
            callback('Unable to find geolocation')
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees (${body.request.unit}) outside. It feels like ${body.current.feelslike}d.`)
        }
    })
}

export default weatherSearch