var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
const assert = require('assert');
var flash = require("req-flash");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");
// var kelasRouter = require("./routes/kelas");
// var sessionRouter = require("./routes/session");
// Definisi lokasi untuk auth
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(
//   session({
//     secret: "iniadalahrahasiamu",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60 * 60 * 1000 },
//   })
// );
// app.use(flash());

// // tambahkan ini
app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});
// Setting folder views
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
// app.use("/kelas", kelasRouter);
// app.use("/session", sessionRouter);
// Gunakan routes yang telah didefinisikan untuk auth
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
var kelas = [
  { id: 1, nama_kelas: "Backend"},
  { id: 2, nama_kelas: "Frontend"},
  { id: 3, nama_kelas: "Fullstack"}
]
app.get('/api/kelas', function (req,res) {
  res.json({data: kelas});
  res.send({data: kelas});
});
app.get('/api/kelas/:id', function (req,res) {
 const kls =  kelas.find(k => k.id === parseInt(req.params.id));
 if (!kls) res.status(404).send("Kelas tidak ditemukan");// tampilkan status 404
 res.json({data: kls});
 res.send({data: kls});
});
app.post('/api/kelas', function(req,res){
  //Kondisi apabila nama kelas kosong
  if (!req.body.nama_kelas) {
      // Menampilkan pesan error ketika field nama kelas kosong
      res.status(400).send("Nama kelas harus diisi");
      return;
  }
  const kls = {
      id: kelas.length + 1,
      nama_kelas: req.body.nama_kelas
  };
  kelas.push(kls);
  res.send(kls);})

  // Mengupdate data
app.put('/api/kelas/:id', function(req,res){
  //Cek id kelas
  const klas =  kelas.find(k => k.id === parseInt(req.params.id));
  if (!klas) res.status(404).send("Kelas tidak ditemukan");// tampilkan status 404
  
  if (!req.body.nama_kelas) {
      // Menampilkan pesan error ketika field nama kelas kosong
      res.status(400).send("Nama kelas harus diisi");
      return;
  }
  klas.nama_kelas =  req.body.nama_kelas
  res.send({pesan: "Data berhasil diupdate." , data: klas});
})

// Menghapus data
app.delete('/api/kelas/:id', function(req,res){
  //Cek id kelas
  const klas =  kelas.find(k => k.id === parseInt(req.params.id));
  if (!klas) res.status(404).send("Kelas tidak ditemukan");// tampilkan status 404
  
  const index = kelas.indexOf(klas);
  kelas.splice(index, 1);
  res.send({pesan: "Data berhasil dihapus." , data: klas});
})
const jwt = require('jsonwebtoken');

//Letakkan kode script AUTH setelah proses crud 
//Auth JWT
app.post('/api/login',(req,res)=>{
   
    const user = {
        id:Date.now(),
        userEmail:'admin@gamelab.id',
        password:'gamelab'
    }
//Untuk generate token user
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
})
app.get('/api/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err)
            res.sendStatus(403);
        else{
            res.json({
                message:"Selamat Datang di Gamelab Indonesia",
                userData:authData
            })
           
        }
    })
  
});


function someFunction() {
    // Kode potensial yang dapat menimbulkan kesalahan
    throw new Error('Error occurred in someFunction');
  }
  
  // Route dengan try-catch error handling
  app.get('/tryCatchExample', (req, res) => {
    try {
      // Potensi kode yang dapat menimbulkan kesalahan
      const result = someFunction();
      res.json({ result });
    } catch (error) {
      // Tangani kesalahan di sini
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route dengan exception handling
  app.get('/exceptionExample', (req, res) => {
    function throwError() {
      throw new Error('This is an error message');
    }
  
    try {
      throwError();
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route dengan error codes
  app.get('/errorCodeExample', (req, res) => {
    function processInput(input) {
      if (!input) {
        const error = new Error('Input is required');
        error.code = 400; // Set error code
        throw error;
      }
      // Proses input di sini
      res.json({ input });
    }
  
    try {
      processInput(null);
    } catch (error) {
      console.error('Error:', error.message);
      console.error('Error Code:', error.code); // Menampilkan error code
      res.status(error.code || 500).json({ error: error.message });
    }
  });
  
  // Route dengan assertions
  app.get('/assertionExample', (req, res) => {
    function divide(a, b) {
      assert.notStrictEqual(b, 0, 'Divisor should not be zero');
      return a / b;
    }
  
    try {
      const result = divide(10, 0);
      res.json({ result });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//Verifikasi Token
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    //cek jika bearer kosong/tidak ada
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //Get token 
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    }else{
        //Jika tidak bisa akses mengarahkan ke halaman forbidden
        res.sendStatus(403);
    }
}
module.exports = app;
