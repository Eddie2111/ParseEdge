const mysql         = require('mysql');
const bcrypt        = require('bcrypt');
const sqlconnection = require("../model/sqlconnection");
const mysqli        = require("../model/sqlconnection");
function indexForm1(name,email,message,password){
    const saltRounds = 10;
    const myPlaintextPassword = password;     
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    const hashpassword = hash;
    
  const data = {
    id       : null,
    name     : name,
    email    : email,
    password : hashpassword,
    message  : message
    }
    const sql = "INSERT INTO users SET ?";
    const query = sqlconnection.query(sql, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
    query.on('error', function(err) {
        console.log(err);
    });
    sqlconnection.end();
return data;
}

module.exports = indexForm1;





