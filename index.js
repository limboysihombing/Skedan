const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

// BodyParser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))



// Handlebars Middleware
app.engine('.hbs', exphbs());
app.set('view engine', '.hbs');

//public
app.use(express.static('./public'))
//cookie
app.use(cookieParser())

app.get('/', (req, res)=>{
    if(req.cookies && req.cookies.token && req.cookies.token != ' '){
        req.akun = jwt.verify(req.cookies.token, 'kuncipenting')   
        res.render('home', {title : "Home", akun : req.akun})
    }
    else{
        res.render('home', {title : "Home"})
    }
        
})
app.use('/admin', require('./routes/admin/admin'))

app.use('/pemesanan', require('./routes/pemesanan/pemesanan'))

app.use('/login', require('./routes/auth/login'))
app.use('/register', require('./routes/auth/register'))

app.get('/logout', function(req, res){
    res.cookie('token', ' ')
    res.redirect('/login')
})

app.get('/:id', (req, res)=>{
    if(req.cookies && req.cookies.token && req.cookies.token != ' '){
        req.akun = jwt.verify(req.cookies.token, 'kuncipenting')   
        
        if(req.params.id == "wpap"){
            res.render('detail_jasa', {akun : req.akun, nama : "Wedha's Pop Art Potrait (WPAP)", image: "/asset/img/wpap/wpap.JPG", harga : 70000, deskripsi :"Ilustrasi potret wajah yang bersaling-silang secara geometri dengan penggunaan kontradiksi warna-warna khusu", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "sketsa"){
            res.render('detail_jasa', {akun : req.akun, nama : "Sketsa Pensil", harga : 70000, image: "/asset/img/sketsa/sketsa.JPG", deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "karikatur"){
            res.render('detail_jasa', {akun : req.akun, nama : "Karikatur", image :"/asset/img/karikatur/karikatur.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "vektor"){
            res.render('detail_jasa', {akun : req.akun, nama : "Gambar Vektor", image :"/asset/img/vector/bunghatta.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "doodle"){
            res.render('detail_jasa', {akun : req.akun, nama : "Doodle Art", image :"/asset/img/doodle/doodle.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "watercolor"){
            res.render('detail_jasa', {akun : req.akun, nama : "Water Color", image :"/asset/img/watercolor/watercolor.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else{
            res.render('error_page', {msg_error : "Halaman Tidak Ditemukan"})
        }
    }
    else{

        if(req.params.id == "wpap"){
            res.render('detail_jasa', {nama : "Wedha's Pop Art Potrait (WPAP)", image: "/asset/img/wpap/wpap.JPG", harga : 70000, deskripsi :"Ilustrasi potret wajah yang bersaling-silang secara geometri dengan penggunaan kontradiksi warna-warna khusu", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "sketsa"){
            res.render('detail_jasa', {nama : "Sketsa Pensil", harga : 70000, image: "/asset/img/sketsa/sketsa.JPG", deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "karikatur"){
            res.render('detail_jasa', {nama : "Karikatur", image :"/asset/img/karikatur/karikatur.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "vektor"){
            res.render('detail_jasa', {nama : "Gambar Vektor", image :"/asset/img/vector/bunghatta.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "doodle"){
            res.render('detail_jasa', {nama : "Doodle Art", image :"/asset/img/doodle/doodle.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else if(req.params.id == "watercolor"){
            res.render('detail_jasa', {nama : "Water Color", image :"/asset/img/watercolor/watercolor.jpg", harga : 70000, deskripsi :"Penggambaran suatu objek konkret dengan cara melebih-lebihkan ciri khas objek tersebut.", lama_pengerjaan : "1-3 Hari"})
        }
        else{
            res.render('error_page', {msg_error : "Halaman Tidak Ditemukan"})
        }
    }
})



const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server berjalan pada http://localhost:${port}`)
})