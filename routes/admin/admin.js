const express = require('express')
const router = express.Router()
var daftar_pesanan = require('../../config/pesanan_function')
var daftar_komentar = require('../../config/komentar_functon')
var user = require('../../config/user_function')
const multer = require('multer')
const path = require('path')
var jwt = require('jsonwebtoken')
var uuid = require('uuid')

router.get('/*', (req, res, next)=>{
  if(req.cookies && req.cookies.token && req.cookies.token != ' '){
    req.akun = jwt.verify(req.cookies.token, 'kuncipenting')
    next()
  }
  else{
    
    res.render('login', {msg : 'Silahkan login terlebih dahulu untuk lanjut.'})
  }
})
router.get('/semua_pesanan', (req, res)=>{
  if(req.akun){
    daftar_pesanan.semua_pesanan((hasil)=>{
      if(hasil.length < 1)
        res.render('./admin/daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun, layout: 'admin', msg : 'Belum ada pesanan.'})
      else{
        res.render('./admin/daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun, layout: 'admin'})
      }
    })
  }
  else {
    // cookie tidak tersedia
    res.status(402)
    res.send('Maaf Anda belum login')
  }
 
})

router.get('/detail_pesanan/:id_pesanan', (req, res)=>{
  if(req.akun){
    var komentar = {}
    daftar_komentar.selectByPesanan(req.params.id_pesanan, (h)=>{
      komentar = h
    })
    daftar_pesanan.selectByIdWithCustomer(req.params.id_pesanan, (cb)=>{
      res.render('./admin/detail_pesanan', {pesanan : cb[0], komentar : komentar,akun : req.akun, layout : 'admin'})
    })
  }
  else {
    // cookie tidak tersedia
    res.status(402)
    res.send('Maaf Anda belum login')
  }
})

router.get('/daftarPermintaanJualKarya', (req, res)=>{
  res.render('admin/admin_data_permintaan_jual_karya', {layout : 'admin'})
})

router.get('/mulai_kerjakan/:id_pesanan', (req,res)=>{
  if(req.akun){
    var komentar = {}
    daftar_komentar.selectByPesanan(req.params.id_pesanan, (h)=>{
      komentar = h
    })
    daftar_pesanan.updateOneColumn('status', '"Sedang Dikerjakan"', req.params.id_pesanan,(result)=>{
      console.log('Berhasil Update, Mulai kerjakan.')
    })
    daftar_pesanan.selectByIdWithCustomer(req.params.id_pesanan, (cb)=>{
      res.render('./admin/detail_pesanan', {pesanan : cb[0], komentar : komentar,akun : req.akun, layout : 'admin', msg_success: 'Sedang dikerjakan.'})
    })
  }
  else{
    // cookie tidak tersedia
    res.status(402)
    res.send('Maaf Anda belum login')
  }
})


router.get('/hapus_pesanan/:id_pesanan', (req, res) =>{
  if(req.akun){
    
    daftar_komentar.hapusKomentar(req.params.id_pesanan, (cb)=>{
      console.log(cb)
    })
    daftar_pesanan.deletePesanan(req.params.id_pesanan, (results)=>{
      console.log(results)
    })
    daftar_pesanan.semua_pesanan((hasil)=>{
      if(hasil.length < 1)
        res.render('./admin/daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun, layout: 'admin', msg_warning : 'Belum ada pesanan.'})
      else{
        res.render('./admin/daftar_pesanan', {daftar_pesanan : hasil, akun : req.akun, layout: 'admin', msg_success: 'Berhasil menghapus pesanan.'})
      }
    })
  } 
  else{
    // cookie tidak tersedia
    res.status(402)
    res.send('Maaf Anda belum login')
  }
})

router.post('/pesan_komentar/:id_pesanan', (req, res)=>{
  if(req.cookies && req.cookies.token){
    req.akun = jwt.verify(req.cookies.token, 'kuncipenting')

    var komentar = req.body
    komentar.id_komentar = uuid.v4()
    komentar.id_customer = req.akun.id_customer
    komentar.id_pesanan = req.params.id_pesanan
    daftar_komentar.insertKomentar(komentar, (cb)=>{
      res.redirect('/admin/detail_pesanan/'+komentar.id_pesanan)
    })

  }
  else{
    res.render('login', {msg : 'Silahkan login terlebih dahulu untuk lanjut.'})
  }
})

//Konfirmasi Gambar
router.post('/konfirmasi_gambar/:id_pesanan', (req,res)=>{
  if(req.cookies && req.cookies.token){
    req.akun = jwt.verify(req.cookies.token, 'kuncipenting')
    uploadKonfirmasiGambar(req, res, (err)=>{
      if(err){
        res.render('./error_page', {msg_error:err})
      }else{
        if(req.file == undefined){
          res.render('./error_page', {msg_warning:'Error : Gambar belum di upload!'})
        }
        else{
          daftar_pesanan.updateOneColumn('status', '"Konfirmasi Gambar"', req.params.id_pesanan,(result)=>{
            console.log('Berhasil Update, Mulai kerjakan.')
          })

          daftar_pesanan.updateOneColumn('gambar_konfirmasi', `"/asset/img/gambar_konfirmasi/${req.file.filename}"`, req.params.id_pesanan, (result)=>{
            res.redirect('/admin/detail_pesanan/'+req.params.id_pesanan)
          })
        }
      }
    })
  }
})

var storageKonfirmasi = multer.diskStorage({
  destination: './public/asset/img/gambar_konfirmasi/',
  filename: (req, file, cb) => {
    cb(null, 'Konfirmasi_' + Date.now() + 
    path.extname(file.originalname))
  }
})

var uploadKonfirmasiGambar = multer({
  storage : storageKonfirmasi,
  limits:{fileSize:10000000},
  fileFilter : (req, file, cb) =>{
    checkFileTYpe(file, cb);
  }
}).single('gambar_konfirmasi');

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
module.exports = router