const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
var daftar_user = require('../../config/user_function')

router.get('/', (req, res)=>{
  res.render('login')
})
router.post('/auth', (req, res, next)=>{
  var user
  daftar_user.single_user(req.body.uemail, (hasil)=>{
    if(hasil.length < 1){
      res.status(404)
      res.render('login', {msg : 'email yang anda masukkan tidak terdaftar'})
    }
    else{
      var index = hasil.findIndex((u)=>{
        return u.password == req.body.upassword
      })
      if(index > -1){
        user = hasil[index]
        var token = jwt.sign({id_customer : user.id_customer,email : user.email, nama : user.nama}, 'kuncipenting')
        res.status(200)
        res.cookie('token', token)
        if(user.isadmin == 1){
          res.redirect('/admin/semua_pesanan')
        }
        else
          res.redirect('/')
      }else{
        res.status(404)
        res.render('login', {msg : 'Password yang anda masukkan salah anda salah'})
      }
    }
  })
  
})

module.exports = router