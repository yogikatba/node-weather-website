const request = require('request')

const forecast = (lati, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5f0b9ffb28b072e5cbf829fdf8278479&query=' + lati +',' + long
    //console.log(url)
    request({url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to weather service')        
        }
        else if(body.error){
            callback('Unable to find location')        
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. There is ' + body.current.precip + '% chance of rain.')
        }    
    })
}


module.exports = forecast