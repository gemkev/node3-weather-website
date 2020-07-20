const express = require('express')
const path = require('path') // core Node module, so no need to install
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths
const publicDirectoryPath = path.join(__dirname, '../public') // Go up one level, then into public folder
const viewsPath = path.join(__dirname, '../templates/views') // folder for HBS
const partialsPath = path.join(__dirname, '../templates/partials')

// Set Handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // and path
hbs.registerPartials(partialsPath)

// Set up path for static files in Express
app.use(express.static(publicDirectoryPath)) // Sets default folder, so we can serve up STATIC contents from there
// NOTE: we're now using dynamic content thanks to handlebars

//  Render index (extension not necessary) from /views
app.get('', (req, res) => {
    console.log('Inside app.get')
    res.render('index', {
        title: 'Weather App', 
        name: 'Andrew Mead'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Andrew Mead'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        message: 'Contact us for help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address
    if (! address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => { // Error? Default to empty object. 
        if (error) {
            return res.send({
                error // Shorthand for error: error
            })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error: error // Not using shorthand here just to show the difference
                })
            }
            res.send({
                forecast: forecastData,
                location, // Shorthand for location: location
                address: address
            })
          })
    })


})

app.get('/products', (req, res) => {
    if (! req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

// Any /help page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help page not found',
        name: 'Andrew Mead'
    })
})

// 404 catchall - MUST COME LAST, as it's used for anything that hasn't been matched above
app.get('*', (req, res) => { // NOTE wildcard character
    res.render('404', {
        title: '404',
        message:  'Page not found',
        name: 'Andrew Mead'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

