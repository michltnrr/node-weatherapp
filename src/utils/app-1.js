const request = require(`request`)
const geocode = require(`./utils/geocode.js`)
const forecast = require("./utils/forecast.js")

const input = process.argv[2]

if(input) {
    geocode(input, (error, {longitude, latitude, location}) => {
        if(error) {
            return console.log(error)
        }
       
        //the input for forecast comes from the output of geocode
        forecast(longitude, latitude, (error, weatherData) => {
            if(error) {
                return console.log(error)
            }
            
            console.log(location)
            console.log(weatherData)
        })
    })

} else {
    console.log(`No location provided, pls enter a location`)
}


/*challenge
1.access the command line arg wo yargs
2. use the string val as input for geocode
3. only geocode if a loation was provided
4. test w some locations*/

//DESTRUCTURING PROP SHORTHAND CHALLENGE
/* use both prop shrthnd and destruct
1. destructn in app,js, geocode.js, forecast.js
2. use prop shrthand in forecasr.js and geocode.js
3. test*/