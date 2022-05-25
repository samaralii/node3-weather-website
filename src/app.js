const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handle bars engine and views locations
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Samar'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Samar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is new message',
        title: 'Help title',
        name: 'Samar'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'No address provided.'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (err, response) => {

            if (err) {
                return res.send({ error })
            }

            res.send({
                forecast: response,
                location: location,
                address: req.query.address
            })

        })

    })



})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', { message: 'Help article not found.', title: '404', name: 'Samar' })
})

app.get("*", (req, res) => {
    res.render('404', { message: 'Page not found', title: '404', name: 'Samar' })

})

app.listen(3000, () => {
    console.log('Server is on port 3000.')
})