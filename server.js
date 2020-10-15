//file for our actual server

//import express
const express = require('express')

//app for express
const app = express()

//import layout package
const expressLayouts = require('express-ejs-layouts')

//to be able to execute routes we have to hook-up the directory
const indexRouter = require('./routes/index')

//configuration of express app
    //set view engine, we are going to use 'ejs' engine
    app.set('view engine', 'ejs')
    //where are views are coming from in our case 'views' directory
    //we have to create that folder
    app.set('views', __dirname + '/views')
    //we have to hook-up layouts so we have to tell where layouts are going to be
    //idea of layouts is to store there header and footer and other content which is common
    //for each and every html file
    //its going to be stored in layouts folder in file called layout
    app.set('layout', 'layouts/layout')
    //we have to tell to our app we are going to use layouts
    app.use(expressLayouts)
    //we have to tell our app where our 'public' folder is going to be
    //content of this file is: style sheets, js files or images
    app.use(express.static('public'))

   //DB connection
   const mongoose = require('mongoose')
   const url = 'mongodb+srv://eb110:fhekjrs343Df@cluster0-rnf08.mongodb.net/test?retryWrites=true&w=majority'
   mongoose.connect(url,{
       useNewUrlParser: true,
       useCreateIndex : true,
       useUnifiedTopology : true
   })
   const db = mongoose.connection
   db.on('error', error => console.error(error))
   db.once('open', () => console.log('Connected to Mongoose'))
   
    //tell the app to use routes
    app.use('/', indexRouter)

    //we have to tell our app we are going to listen on certain ports
    app.listen(process.env.PORT || 3000)