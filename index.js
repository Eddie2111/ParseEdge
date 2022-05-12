const express = require ("express");
var Mongo = require('mongodb').MongoClient;
const session = require('express-session');
var cookieParser = require('cookie-parser');


// database call
const nosqlconnection = require('./model/nosqlconnection');


// set up calls
require('dotenv').config();
const app = express();
const secretKey = require('./controller/bcryption');
const MongoCli_Request = require("./model/nosqlconnection");


// not implemented
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// not implemented


// database optimization on progress
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;
MongoCli_Request();



// Environment setup
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Environment setup


// set the view engine to ejs
app.set('view engine', 'ejs');


//sessioning
app.use(cookieParser());
app.use(session({
    secret: secretKey,
    saveUninitialized: false,
    resave: false,
    maxAge: 36000
  }))

 // routes


 // home page
 app.get("/", (req, res) => {
    res.render("pages/index");
 });


 // registration page route
app.get("/registration", (req, res) => {

      res.render("pages/career", {title: "Career",message:''} );      

});

app.post("/registration",(req,res)=>{
  const data = req.body;
    console.log(data);
    
   Mongo.connect(url, function (err, db) {
    if(err) throw err;
    else console.log('Atlas mongodb connection active!');
    var dbo = db.db("eventizer");


    dbo.collection("event_vendors").findOne({email:req.body.email,phonenumber:req.body.phonenumber},function(err,result){
       if (err) throw err;
       if (result){
          console.log('Already exists!');
          res.render("pages/career",{title:"vendors",message:"Email or phonenumber already in use!!"});
       }
       else{
         dbo.collection("event_vendors").insertOne(data,function(err,result){
         if (err) throw err;
         if (result){
           console.log(result,'Inserted!');
           res.render("pages/index",{title:"vendors",message:"registration complete!"});
         }
         
       });


       }
    });
 });
    
});


// search page, not required but to test the database
app.get("/search",(req,res)=>{
  const result={};
  console.log(result.x);
  res.render("pages/search",{result:result});
});
app.post("/search",(req,res)=>{
  const data = req.body;
  if(data.name){
    var MongoClient = Mongo.connect(url, function (err, db) {
      if(err) throw err;
      var dbo = db.db("eventizer");
      dbo.collection("event_vendors").findOne({firstname:data.name},function(err,result){
        if (err) throw err;
        if (result){
          //console.log(result);
          res.render("pages/search", {result:result} );
        }
        if (!result){
          const result = {};
          //console.log("No data found");
          res.render("pages/search", {result:result} );
        }
      });
    });
  }
  if(data.service){
    var MongoClient = Mongo.connect(url, function (err, db) {
      if(err) throw err;
      var dbo = db.db("eventizer");
      dbo.collection("event_vendors").findOne({service:data.service},function(err,result){
        if (err) throw err;
        if (result){
          console.log(result);
          res.render("pages/search", {result:result} );
        }
        if (!result){
          const result = {};
          console.log("No data found");
          res.render("pages/search", {result:result} );
        }
      });
    });
  }
});
        
 // routes



const port = process.env.PORT;

app.listen(port,()=>{
  console.log("app started on "+port);
});
