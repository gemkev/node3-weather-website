const express = require('express')
const path = require('path') // core Node module, so no need to install

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public') // Go up one level, then into public folder
app.use(express.static(publicDirectoryPath)) // Sets default folder, so we can serve up STATIC contents from there
// NOTE: we're now using dynamic content thanks to handlebars


app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    res.send([
        {
            name: 'Andrew',
            age: 27,
        },
        {
            name: 'Sarah', 
            age: 35
        }
    ])
})

 app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req,res) => {
    res.send({ // Object is automatically converted to JSON by express
        forecast: 'Mostly cloudy with with an occasional shower',
        location: 'Philadelphia'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

