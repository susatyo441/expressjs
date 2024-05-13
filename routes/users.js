var express = require("express");
var router = express.Router();
const memberController = require("../controllers/memberController");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get("/", memberController.get);
router.post("/", memberController.post);
router.get("/header", memberController.header);
router.get("/path", memberController.path);

const users = {
    gamelab: {
      username: 'gamelab',
      password: 'indonesia',
    },
  };
  const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Tidak ada akses' });
    }
    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic') {
      return res.status(401).json({ message: 'Tidak ada akses' });
    }
    const [username, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');
    const user = users[username];
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Tidak ada akses' });
    }
    req.auth = { username };
    next();
  };
  router.use(authenticate);
  router.get('/profile', (req, res) => {
    res.json({
      message: 'Selamat Datang di Gamelab Indonesia',
      user: req.auth,
    });
  });
  // const header = { "alg": "HS256", "typ": "JWT" }
  // const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
  // console.log(`Ini adalah token untuk header : ${encodedHeader}`)
  // // Ini adalah kode script untuk token payload
  // const payload = { username: 'Gamelab Indonesia' }
  // const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
  // console.log(`Ini adalah token untuk payload : ${encodedPayload}`)
  // // Ini adalah kode script untuk token signature
  // const crypto = require('crypto')
  // const jwtSecret = 'secretKey'
  // const signature = crypto.createHmac('sha256', jwtSecret)
  //                         .update(encodedHeader + '.' + encodedPayload)
  //                         .digest('base64')
  // console.log(`Ini adalah token untuk signature : ${signature}`)
  // // Ini adalah kode script untuk token JWT
  // const jwt = `${encodedHeader}.${encodedPayload}.${signature}`
  // console.log(`Ini adalah hasil dari token JWT : ${jwt}`)
module.exports = router;
