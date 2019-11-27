const express = require('express')
const router = express.Router()
var daftar_pesanan = require('../../config/pesanan_function')
var daftar_komentar = require('../../config/komentar_functon')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

router.get('/*', (req, res, next)=>{
  if(req.cookies && req.cookies.token && req.cookies.token != ' '){
    req.akun = jwt.verify(req.cookies.token, 'kuncipenting')
    next()
  }
  else{
    // console.log(req.akun)
    res.render('login', {msg : 'Silahkan login terlebih dahulu untuk lanjut.'})
  }
})
// router.get('/form', (req, res)=>{
//   if(req.akun){
//     res.render('./pemesanan_layout/form_pemesanan', {akun : req.akun})
//   }
//   else {
//     // cookie tidak tersedia
//     res.status(402)
//     res.render('login', {msg : 'Silahkan login terlebih dahulu untuk lanjut.'})
//   }
// })
router.get('/detail_pesanan/:id', (req, res)=>{
  var komentar = {}
  daftar_komentar.selectByPesanan(req.params.id, (h)=>{
    komentar = h
  })
  daftar_pesanan.selectById(req.params.id, (pesanan)=>{
    res.render('./pemesanan_layout/detail_pesanan', {pesanan : pesanan[0], akun : req.akun, komentar : komentar})
  })
})
// Pemesanan
router.post('/', (req, res)=>{
  if(req.cookies && req.cookies.token){
    
  
    req.akun = jwt.verify(req.cookies.token, 'kuncipenting')

    upload(req,res, (err) =>{
      if(err){
        res.render('./pemesanan_layout/form_pemesanan', {msg:err})
        // res.json({msg : err})
      }
      else{
        if(req.file == undefined){
          res.render('./error_page', {msg_error:'Error : Gambar belum di upload!'})
        }
        else{
          var pesanan = req.body
          pesanan.id_pesanan = uuid.v4()
          pesanan.id_customer = req.akun.id_customer
          pesanan.status = 'Pending'
          pesanan.pembayaran = 'Belum Dibayar'
          pesanan.gambar = `/asset/img/${req.file.filename}`
          daftar_pesanan.createPesanan(pesanan, (results)=>{
            console.log(results)
          })
          pesanan.tanggal= new Date()
  
          res.render('./pemesanan_layout/detail_pesanan', {pesanan : pesanan, msg_success: 'Pemesanan berhasil dilakukan!!. Saatnya lakukan pembayaran dengan upload bukti bayar, pesanan anda akan segera di proses.'})
        }
      }
    })
  }
  else{
    res.render('login', {msg : 'Silahkan login terlebih dahulu untuk lanjut pesan.'})
  }
  
})

var storage = multer.diskStorage({
  destination: './public/asset/img/',
  filename: (req, file, cb) => {
    cb(null, file.filename + '-' + Date.now() + 
    path.extname(file.originalname))
  }
})

var upload = multer({
  storage : storage,
  limits:{fileSize:10000000},
  fileFilter : (req, file, cb) =>{
    checkFileTYpe(file, cb);
  }
}).single('gambar');

// Chekck File Type
function checkFileTYpe(file, cb){
  // Allowed ext
  const fileTypes = /jpeg|bmp|jpg|png|gif/;
  // Check ext
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

  // Check mime
  const mimetype = fileTypes.test(file.mimetype)
  if(mimetype && extname){
    return cb(null, true)
  }
  else{
    cb('Error : Hanya dapat menerima gambar!')
  }
}

//Pembayaran
router.post('/pembayaran/:id', (req,res)=>{
  console.log(req.params)
  if(req.cookies && req.cookies.token){
    req.akun = jwt.verify(req.cookies.token, 'kuncipenting')
    uploadPembayaran(req, res, (err)=>{
      if(err){
        res.render('./error_page', {msg_error:err})
      }else{
        if(req.file == undefined){
          res.render('./error_page', {msg_warning:'Error : Gambar belum di upload!'})
        }
        else{
          daftar_pesanan.updatePembayaran(`/asset/img/pembayaran/${req.file.filename}`, req.params.id, (result)=>{
            res.redirect('/pemesanan/daftar_pesanan')
          })
        }
      }
    })
  }
})

var storagePembayaran = multer.diskStorage({
  destination: './public/asset/img/pembayaran/',
  filename: (req, file, cb) => {
    cb(null, 'Pembayaran_' + Date.now() + 
    path.extname(file.originalname))
  }
})

var uploadPembayaran = multer({
  storage : storagePembayaran,
  limits:{fileSize:10000000},
  fileFilter : (req, file, cb) =>{
    checkFileTYpe(file, cb);
  }
}).single('gambar_pembayaran');

//daftar pesanan
router.get('/daftar_pesanan', (req, res)=>{
  if(req.akun){
    daftar_pesanan.selectByCustomer(req.akun.id_customer, (hasil)=>{
      if(hasil.length < 1)
        res.render('daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun, msg_warning : 'Pesanan masih Kosong, Ayo pesan sekarang.'})
      else{
        res.render('daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun})
      }
    })
  }
  else {
    // cookie tidak tersedia
    res.status(402)
    res.send('Maaf Anda belum login')
  }
})

// Hapus Pesanan
router.get('/hapus_pesanan', (req, res) =>{
  if(req.akun){
    
    daftar_komentar.hapusKomentar(req.query.id, (cb)=>{
      console.log(cb)
    })
    daftar_pesanan.deletePesanan(req.query.id, (results)=>{
      console.log(results)
    })
    daftar_pesanan.selectByCustomer(req.akun.id_customer, (hasil)=>{
      if(hasil.length < 1)
        res.render('daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun, msg_success : 'Pesanan Kosong, ayo pesan sekarang'})
      else{
        res.render('daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun, msg_success : 'Berhasil Menghapus Pesanan'})
      }
    })
  }
  else{
    // cookie tidak tersedia
    res.status(402)
    res.send('Maaf Anda belum login')
  }
})

// Kirim Komentar
router.post('/pesan_komentar/:id_pesanan', (req, res)=>{
  if(req.cookies && req.cookies.token){
    req.akun = jwt.verify(req.cookies.token, 'kuncipenting')

    var komentar = req.body
    komentar.id_komentar = uuid.v4()
    komentar.id_customer = req.akun.id_customer
    komentar.id_pesanan = req.params.id_pesanan
    daftar_komentar.insertKomentar(komentar, (cb)=>{
      res.redirect('/pemesanan/detail_pesanan/'+komentar.id_pesanan)
    })

  }
  else{
    res.render('login', {msg : 'Silahkan login terlebih dahulu untuk lanjut.'})
  }
})

  
module.exports = router