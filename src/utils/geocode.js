const request = require("postman-request")

const geocode = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibml2YXMxOTk4IiwiYSI6ImNrb2VhNzJobDBhYWcydW9hemlnNXYwaXYifQ.gZgGpels597HdmEjlNcT0Q&limit=1'
    request({url:geoCodeUrl, json:true} , (error,{ body }) => {
        if(error) {
            callback('Unable to connect to the weather services!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search!',undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode