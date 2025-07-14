const path = require(`path`)
const express = require(`express`)
const hbs = require(`hbs`)
const geocode = require(`./utils/geocode.js`)
const forecast = require(`./utils/forecast.js`)

const app = express()
//define paths for express config
const publicDirpath = path.join(__dirname, `../public`)
const viewsPath = path.join(__dirname, `../templates/views`)
const partialsPath = path.join(__dirname, `../templates/partials`)

//setup handlebars engine & views location
app.set(`view engine`, `hbs`)
app.set(`views`, viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirpath))

app.get(``, (req, res) => {

    res.render(`index`, {
        title: `Weather App`,
        name: 'Mike Turner'
    }) 
})

app.get(`/about`, (req, res) => {
    res.render(`about`, {
        title: 'About Me',
        name: 'Mike Turner'
    })
})


app.get(`/help`, (req, res) => {
    res.render(`help`, {
        body: `If you need help navigating the site you shouldn't be using it lil bro`,
        title: `Help`,
        name: `Mike Turner`
    })
})

/*BUILDING A JSON HTTP ENDPOINT

CHALLENGE- update weather endpoint to accept address
- no address? send back an err msg
- adress? send back static JSON
    -add address prop onto JSON which returns the provided address
-test 

CHALLGENGE 2 - wire up weather
- require geocode/forecast into app.js
- use the address to geocode
- use the coordinates to get the forecast
- send back the real forecas and location*/

app.get(`/weather`, (req, res) => {
    if(!req.query.address) {
        return res.send(`Please enter an address for the search`)
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, weatherData) => {
            if(error) {
                return res.send({error})
            }
            
            res.send( {
                weatherForecast: weatherData, 
                location: location,
                address: req.query.address
            })
        })
    })
})
//ACESSING API IN BROWSER 
//Query strings
//to get info ab the query string we use the req param
app.get(`/products`, (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // console.log(req.query)
    console.log(req.query.search)
    
    //the query string will be parsed by express, we get the key val pairs returned as an obj
    res.send({
        products: []
    })
    // withput the return statement in line 55 we'll get an error for setting headers after they've been sent to the client
    // so the error means ur sending to responses when u can only send one
})

//catch all for help 404
app.get(/^\/help\/.+/, (req, res) => {
    res.render('error', {
        title: `404`,
        errMsg: `Help article`,
        name: `Mike Turner`
    })
})

//catch all 404s
app.get(/.*/, (req, res) => {
    res.render('error', {
        title: `404`,
        errMsg: 'Page',
        name: 'Mike Turner'
    });
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000.`)
})