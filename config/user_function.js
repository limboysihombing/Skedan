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
  }
}

module.exports = user_function;