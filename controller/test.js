
// modules playground, use to test modules
var Mongo = require('mongodb').MongoClient;
require('dotenv').config();
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;

// console.log(hash);
function MongoCli_Post(data){
    Mongo.connect(url, function (err, db) {
         if(err) throw err;
         var dbo = db.db("eventizer");
    });

}


MongoCli_Post({firstname:"john"});

