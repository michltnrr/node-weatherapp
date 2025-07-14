const request = require(`request`)
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


/*NEW FEATURE DEPLOYEMENT WORKFLOW
CHALLENGE
-update the forecast string to include new data
-commit changes
-push to git & heroku
-test on prod */
const forecast = ((long, lat, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=eaed4223001cf199687b1ef19fff356d&query=${lat},${long}&units=f`
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to network 🙃`, undefined)
        } else if(body.error) {
            callback(`No matching result, please enter a valid loction`, undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. Its currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees out. There's a ${body.current.precip}% chance of rain`)
        }
    })
})

module.exports = forecast