const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const weatherResp = require('./utils/weather')
const { RSA_NO_PADDING } = require('constants')

const app = express()
const port = process.env.PORT || 3000

//Define pats for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rokib Hassan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rokib Hassan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message.',
        name: 'Rokib Hassan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geoCode(req.query.address, (error, { Latitude, Longitude, PlaceName } = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        weatherResp(Latitude, Longitude, PlaceName, (error, data) => {
            if(error) {
                return res.send({
                    error: error
                })
                //console.log(error)
            } else {
                return res.send({
                    forecast: data,
                    location: PlaceName,
                    address: req.query.address
                })
                //console.log(data)
            }
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search) {
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
    res.render('404', {
        title: 'Page Not Found!',
        description: 'Help Article Not Found!',
        name: 'Rokib Hassan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found!',
        description: '404 Page Not Found!',
        name: 'Rokib Hassan'
    })
})

app.listen(port, () => {
    console.log('Server running at localhost:' + port)
})