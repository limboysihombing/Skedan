var connection = require('./connection')

var user_function = {
  single_user : (email, hasil, msg)=>{
    connection.query(`SELECT * FROM customer WHERE email='${email}'`, (err, result)=>{
      if(err) throw err;
      else{
          hasil(result) 
      }
    }) 
  },
  single_user_by_id : (id, hasil)=>{
    connection.query(`select nama from customer where id = '${id}'`, (err, res)=>{
      if(err) throw err;
      else{
        hasil(res)
      }
    })
  },
  insert_user: (obj, hasil) => {
    connection.query('INSERT INTO customer (id_customer, nama, alamat, email, password, no_hp, isadmin) VALUES (?, ?, ?, ?, ?, ?, 0)',
      [obj.id_customer, obj.nama, obj.alamat, obj.email, obj.password, obj.no_hp], (err, res) => {
        if (err) throw err
        else {
          hasil(res)
        }
      })
  }
}

module.exports = user_function;