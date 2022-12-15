
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

const publicDirectorPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectorPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek Kumar'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhishek Kumar'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is message from developer.',
        name: "Abhishek Kumar"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "location not provided"
        })
    }
    let area = req.query.location
    geocode(area, (error, { longitude, latitude, place } = {}) => {
        if (error)
            return res.send({
                error
            })
        weather({
            longitude, latitude
        }, (error, forecast) => {
            if (error)
                return res.send({
                    error
                })
            res.send({
                place,
                forecast
            })
        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishek Kumar',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishe Kumar',
        errorMessage: 'Page not found'
    })
})
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('server is up and running at port' + port)
})