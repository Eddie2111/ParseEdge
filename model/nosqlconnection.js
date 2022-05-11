var Mongo = require('mongodb').MongoClient;
require('dotenv').config();
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;

// Connect to the db

function MongoCli_Request(){
   const data = {firstname:"john"};
   Mongo.connect(url, function (err, db) {
      if(err) throw err;
      else console.log('Atlas mongodb connection active!');
      var dbo = db.db("eventizer");
      dbo.collection("event_vendors").findOne({data},function(err,result){
        if (err) throw err;
        if (result){
          console.log(result);
        }
      });
   });
}
function MongoCli_Post(data){
   
   Mongo.connect(url, function (err, db) {
      if(err) throw err;
      else console.log('Atlas mongodb connection active!');
      var dbo = db.db("eventizer");


      dbo.collection("event_vendors").findOne({data},function(err,result){
         if (err) throw err;
         if (result){
            console.log('Already exists!');
         }
         else{
           dbo.collection("event_vendors").insertOne({data},function(err,result){
           if (err) throw err;
           if (result){
             console.log(result,'Inserted!');
           }

         });


         }
      });
   });
}


// Connect to the db


module.exports= MongoCli_Request,MongoCli_Post;
