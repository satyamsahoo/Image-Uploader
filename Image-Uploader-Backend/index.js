const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const fs = require('fs'); 
const appConfig = require('./config/appConfig');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
let multer = require('multer');

var ImageSchema = mongoose.Schema({
    contentType : String,
    image : Buffer
})

var Image = mongoose.model('Image', ImageSchema);


app.get('/', function(req, res) {
    res.json({ message: 'WELCOME' });   
});

app.listen(appConfig.port, () => {
    
    console.log('Server started on port 3000');

    let db = mongoose.connect(appConfig.db, {useNewUrlParser:true});
})

mongoose.connection.on('error', function(err){
    console.log('database connection error');
    console.log(err);
})

mongoose.connection.on('open', function (err){
    if(err){
        console.log("database error")
        console.log(err)
    } else{
        console.log('database connection open success');
    }
})


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage })

app.post('/', upload.single('file'), (req, res) => {
    console.log('server post method called');

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
 // Define a JSONobject for the image attributes for saving to database

    
  
    var finalImg =  new Image({
        contentType: req.file.mimetype,
        image:  new Buffer(encode_image, 'base64')
    });

    finalImg.save(function(err, result){
        if(err) return console.log(err);
        console.log(result);
    })

})

app.get('/all',(req , res) =>{
    Image.find().exec((err, result)=>{
        if(err){
            res.send('Got error');
            console.log(err);
        } else{
            const imgArray= result.map(element => element._id);
            res.send(imgArray);
            console.log(imgArray);
        }
    })
})



