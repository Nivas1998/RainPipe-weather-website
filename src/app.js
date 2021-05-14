const path = require('path')
const request = require("postman-request")
const chalk = require("chalk")
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// const app = express()

//Define Paths for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup static directory to serve up the static assets.
app.use(express.static(publicDirectoryPath)) //we have configured the express to serv up that public-directory

//Setup handlebars engine ,viwes path and partials path
app.set('view engine', 'hbs')
app.set('views', viewsPath);   //====>we need to tell the express that we are going to put our views in viewsPath variable which contains the path that express aplication is needed. 
hbs.registerPartials(partialsPath)

//using GET method 
app.get('',(req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Srinivas.P'
    })
})
app.get('/about',(req, res) => { 
    res.render('about',{            ///==>sending the rendered view to the client
        title:'About Me',           ///==>passing the local varible to view
        name:'Srinivas.P'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Me',
        helpText:'This is some helpful text.',
        name:'Srinivas.P'

    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'Please provide the address term!'
        })
    }

    
    geocode(req.query.address , (error, { longitude, latitude, location } = {}) => {   //===> call-back chaining[we are chaining together multiple callbacks to do multiple things in a specific order]
        if(error){
            return res.send({ error })
        }
    
    
        forecast( longitude, latitude, (error, forecastData) => {
            if(error){
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

//help 404 
app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Nivas',
        errorMessage:'Help article not found'
    })
})

//404 router 
app.get('/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Srinivas',
        errorMessage:'Page not found.'
    })
})
    

var server = app.listen(3000,() => {
    var host =server.address().address
    var port = server.address().port

    console.log("Example app litening at http://%s:%s" ,host,port)
})