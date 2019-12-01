var connection = require("./connection.js")

var pesanan_function ={
  semua_pesanan : function(cb){
    connection.query("select * from pemesanan JOIN customer on pemesanan.id_customer = customer.id_customer where pemesanan.status != 'Selesai' order by tanggal ASC", (err, result)=>{

      if(err) throw err;
      cb(result)
    })
  },
  selectByIdWithCustomer : (id, cb)=>{
    connection.query(`select * from pemesanan JOIN customer on pemesanan.id_customer = customer.id_customer where id_pesanan = '${id}'`, (err, result)=>{
      if(err) throw err;
      cb(result)
    })
  },

  selectByCustomer : (id, cb) => {
    connection.query(`select * from pemesanan where id_customer = '${id}' and status != "Selesai"`, (err, result)=>{
      if(err) throw err
      else{
        cb(result)
      }
    })
  }
  ,
  selectById :(id, cb)=>{
    connection.query(`select * from pemesanan where id_pesanan = '${id}'`, (err, result)=>{
      if(err) throw err
      else{
        cb(result)
      }
    })
  },
  createPesanan : (obj, result) => {
    connection.query('INSERT INTO pemesanan (id_pesanan, id_customer, jenis, biaya, ukuran_bingkai, jumlah_orang, ekspedisi, gambar, tulisan, keterangan, pembayaran, status, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())',
    [obj.id_pesanan, obj.id_customer, obj.jenis, obj.biaya, obj.ukuran_bingkai,obj.jumlah_orang, obj.ekspedisi, obj.gambar, obj.tulisan, obj.keterangan, obj.pembayaran, obj.status], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            result(rows, fields)
        }
    });
  },
  updatePembayaran : (url, id, result) =>{
    connection.query(`update pemesanan set pembayaran = '${url}' where id_pesanan = '${id}'`, function(err, rows, fields){
      if(err) throw err
      else{
        result(rows, fields)
      }
      })

  },
  updateOneColumn : (column, replacement, id_pesanan, result)=>{
    connection.query(`update pemesanan set ${column} = ${replacement} where id_pesanan = '${id_pesanan}'`, function(err, rows, fields){
      if(err) throw err
      else{
        result(rows, fields)
      }
      })
  },

  deletePesanan: function(id, cb){
    connection.query("DELETE FROM `pemesanan` WHERE `id_pesanan` = ?", 
    [id],
    function(err, result) {
      if (err) {
        throw err;
      }else{
        cb(result);
      }
    });
  },
  selectPesananSelesai : (result)=>{
    connection.query('Select * from `pemesanan` where status = "Selesai"', (err, hasil)=>{
      if(err) throw err
      else{
        result(hasil);
      }
    })
  }
}
// var blog_function  = {

// 	selectAllBlog: function(cb){
		
// 		connection.query("SELECT * FROM blog", function(err, results){
// 	 	 	if (err) throw err;
// 	 	 	cb(results)
// 	 	 });
//   },
//   selectBlogById : function(id, cb){
//     connection.query("Select * from blog where id = ?", [id], (err, results) =>{
//       if(err) throw err;
//       cb(results)
//     })
//   },
//   selectPopularBlogs : (hasil) => {
//     connection.query("select top(10) from blog orderBy date", (err, result) => {
//       hasil(result)
//     })
//   },
//   createBlog : (obj, result) => {
//     // INSERT INTO `blog`(`id`, `judul`, `isi`, `penulis`, `tanggal`, `kategori`, `tag`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7])
//     connection.query('INSERT INTO blog (judul, isi, penulis, tanggal, kategori, tag) values (?, ?, ?, ?, ?,?)',
//     [obj.judul, obj.isi, obj.penulis, obj.tanggal, obj.kategori,obj.tag], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             obj(rows, field)
//         }
//     });
//   },
// 	// addSpecies: function(col, val, cb){

//   //     connection.query("INSERT INTO `species` (col) VALUES (?)", [val], function(err, result) {
          
//   //         if (err) throw err;
//   //     cb(result);
//   //     });
//   //  },

//   //   deleteSpecies: function(val, cb){

//   //     connection.query("DELETE FROM `species` WHERE `Species_ID` = ?", [val],function(err, result) {
//   //         if (err) {
//   //           throw err;
//   //         }
//   //     cb(results);
//   //   });

//   //  }	

// }

module.exports = pesanan_function;
