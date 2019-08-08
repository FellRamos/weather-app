const path = require('path')
const express = require('express')
const hbs = require('hbs') // We don't need to load for views only..
const chalk = require('chalk');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Initializing express
const app = express()
const port = process.env.PORT || 3000;

// Defining Paths for Express Config!
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting up handlebars template engine and views Location!
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting the statics folder
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Fell'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Fell'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help right here!',
        title: 'Help',
        name: 'Fell'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
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
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        message: 'Help article not found',
        title: '404',
        name: 'Fell'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        message: 'Page not found',
        title: '404',
        name: 'Fell'
    })
})

app.listen(port, () => {
    console.log(chalk.green.bold('Server running on port ' + port))
})