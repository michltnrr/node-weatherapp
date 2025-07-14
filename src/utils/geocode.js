const request = require(`request`)

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoibWFpa2VsdDNuZSIsImEiOiJjbWNld2g1ZW4wMmY3MnJvZHQzdWlkdjIwIn0.fqYW2dUASoynnJN30cgePg&limit=1`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to network 🙃`, undefined)
        } else if(body.features.length === 0) {
            callback(`No mathcing request, use a valid location`, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.name
            })
        }
    })
}
module.exports = geocode