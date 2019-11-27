const mysql = require('mysql')

var connection;
if(process.env.JAWSDB_URL){
  connection = mysql.createconnection(process.env.JAWSDB_URL)
}else{
  connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "skedan"
});
}

connection.connect((err)=>{
  if(err){
    // throw err
    console.error("error connecting: ", err.stack)
  }
  console.log('MySql Connected as id ' + connection.threadId)
})


module.exports = connection;