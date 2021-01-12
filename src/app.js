import express from 'express'
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
// the below line (only) is necessary if you want to change the folder name of "views" (default name when using handlebars) - viewsPath constant above defined to create path to the new name of the folder that stores handlebars files (".hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// SETUP STATIC DIRECTORY TO SERVE - default method for static server
app.use(express.static(publicDirectoryPath))

// 'get' takes 2 arguments: first a route (partial URL, e.g. '/help' og '/about', and then a function (what to do when someone visits a particular route))
// function takes two important arguments; A) request ("req") and B) response ("res")

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mikkel Tanderup'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mikkel Tanderup',
        priorExperience: 'first time coder'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mikkel Tanderup',
        helpMessage: `Do you need help? Me too...`
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                location,
                address: req.query.address,
                weather: forecastData
            })
        })
    })
})


// 404 pages - IMPORTANT to have as last app.get as the '*' will tell the system to use this as match for anything that hasn't matched with the above routes
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mikkel Tanderup',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mikkel Tanderup',
        errorMessage: 'Page not found'
    })
})

// To start the server up, we have to use 1 method on app: app.listen
// Takes arguments of which address/port to run and a callback

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
