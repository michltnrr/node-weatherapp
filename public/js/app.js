console.log(`Client side JS file is loaded`)
/*fetch is NOT apart of JS it's a browser based api, meaining we can use it in all modern brownser
its not accessible in node js, so this code cant be used in a backend node script*/
//i had to use a different link than the once in the course

/*CHALLENGE
- setup a cal to fetch to fetch weahter for boston
-get the parse json response
    if error prop, print it
    if none, print locaitn & forecast
- refresh the browser & test */

const searchButton = document.querySelector(`#search`)
const searchButtonContent = document.querySelector('input')
const message1 = document.querySelector(`#p1`)
const message2 = document.querySelector(`#p2`)


async function getWeather(location) {
    const request = await fetch(`http://localhost:3000/weather?address=${location}`)
    const data = await request.json()
    if(data.error) {
        message1.textContent = data.error
    }
    else {
        // console.log(data.location ,data.weatherForecast)
        message1.textContent = data.location
        message2.textContent = data.weatherForecast
    }
}


searchButton.addEventListener(`click`, (e) => {
    e.preventDefault()
    const userLocation = searchButtonContent.value
    message1.textContent = `Loading Data...`
    getWeather(userLocation)
})