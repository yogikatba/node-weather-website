const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Yogi Katba'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Yogi Katba'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        helpText: 'For any issues or help go to my ',
        title: 'Help',
        name: 'Yogi Katba'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Yogi Katba',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query
    if(!address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address,(error,{location, latitude, longitude} = {})=>{
        if(error) return res.send({
            error
        })
        //console.log('data', data)

        forecast(latitude, longitude,(error,fdata)=>{
            if(error) return res.send({
                error
            })
            console.log(location)
            console.log(fdata)
            res.send({
                forecast: fdata,
                location,
                address
            })            
        })
           
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Yogi',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up at port ' + port)
})