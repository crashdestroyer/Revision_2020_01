const express = require('express')
//method from 'express' able to create routes
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

//exporting router out of the file
module.exports = router