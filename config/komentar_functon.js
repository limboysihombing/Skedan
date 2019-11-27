var connection = require('./connection.js')


var komentar_function = {
  selectByPesanan : function(id_pesanan, cb)  {
    connection.query(`select * from komentar join customer on komentar.id_customer = customer.id_customer where id_pesanan = '${id_pesanan}' order by tanggal asc`, (err,res)=>{
      if(err) throw err
      else{
        cb(res)
      }
    })
  },
  insertKomentar : (obj, cb) =>{
    connection.query(`insert into komentar (id_komentar, id_pesanan, id_customer, pesan, tanggal) values (?,?,?,?, now())`, 
    [obj.id_komentar, obj.id_pesanan, obj.id_customer, obj.pesan], (err,rows, fields)=>{
      if(err) throw err
      else{
        cb(rows, fields)
      }
    })
  },
  hapusKomentar : (id_komentar, cb) =>{
    connection.query(`delete from komentar where id_pesanan = '${id_komentar}'`, (err, res)=>{
      if(err) throw err
      else{
        cb(res)
      }
    })
  }
}

module.exports = komentar_function