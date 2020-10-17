const express = require('express')
//method from 'express' able to create routes
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== '')
  searchOptions.name = new RegExp(req.query.name, 'i')
    try{
      const authors = await Author.find(searchOptions)
      res.render('authors/index', {
        authors: authors,
        searchOptions: req.query
      })
    }catch{
      res.redirect('/')
    }
})

// New Author Route plus Author object included in the function
//that allows us to use the object inside ejs file
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

//post ma wysy£ac dane na authors/ dlatego wpisujemy tylko /
//aby post zadzia£a£ to musi byc stworzona forma dla niego
//forma znajduje sie w new.ejs bo tam jest nasz button create
//i tam okreslamy gdzie nasz post pójdzie ... form action: /authors

router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })
  try {
    await author.save()
    res.redirect(`authors`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})


//exporting router out of the file
module.exports = router