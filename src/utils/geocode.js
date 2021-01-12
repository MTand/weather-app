import request from 'request'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWlra2VsdGFuZGUiLCJhIjoiY2tqbDc3emxuMjB1NTJ6bzdnY3lpeWc3eSJ9.7i2DTJmdAsuEkBGVzxjwzw&limit=1`
    
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to city identifier API', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to match coordinates with given city name, please try again', undefined)
        } else {
            callback(undefined, {
                latitude:  body.features[0].center[1],
                longtitude:  body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


export default geocode