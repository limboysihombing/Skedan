const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
var daftar_user = require('../../config/user_function')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', (req, res, next) => {
    var object = req.body
    object.id_customer = uuid.v4()
    daftar_user.insert_user(req.body, (hasil) => {
        res.redirect('/login')
    })
})


module.exports = router