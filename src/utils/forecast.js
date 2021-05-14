const request = require("postman-request")
const chalk = require("chalk")

const forecast = ( longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f8fa6f74b3b3a49fbeea3e304b9dc0c6&query=' + latitude + ' , ' + longitude + '&units=m'
    request({url, json: true} , (error,{ body }) => {
        if(error) {
            callback('unable to connect to the weather service',undefined)//prints undefined if we have one
        }
        else if(body.error){ 
            callback('unable to find the pair of coordinates',undefined) //prints undefined if we don't provide coordinates
        }else{
            callback(undefined, ' The weather is '+ (body.current.weather_descriptions[0]) + ' It is currently ' + (body.current.temperature) + ' degrees out. There is a ' + (body.current.precip)  + '%  chance of rain.') //==================> print the parameters of the response that is assigned ,if a response was recieved
        }
          
    })
}
module.exports = forecast