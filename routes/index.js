var express = require("express");
var router = express.Router();
var homeController = require("../controllers").home;
var profileController = require("../controllers").profile;
var verifyUser = require("../library/verify");
router.get("/", verifyUser.isLogin, homeController.home);
router.get("/profile", verifyUser.isLogin, profileController.profile);
module.exports = router;

// var express = require("express");
// var router = express.Router();

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Gamelab Indonesia" });
// });

// router.get("/session", function (req, res, next) {
//   if (req.session?.views) {
//     req.session.views++;
//     res.setHeader("Content-Type", "text/html");
//     res.write("<p>views: " + req.session.views + "</p>");
//     res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
//     res.end();
//   } else {
//     req.session.views = 1;
//     res.end("welcome to the session demo. refresh!");
//   }
// });

// var sessionData;

// router.get("/set_session", function (req, res, next) {
//   sessionData = req.session;
//   sessionData.user = {};
//   let username = "Gamelab";
//   sessionData.user.username = username;
//   sessionData.user.id = Math.random();
//   console.log(
//     `Setting session data:username ${sessionData.user.username} and id ${sessionData.user.id}`
//   );
//   res.json(sessionData.user);
// });

// router.get("/get_session", function (req, res, next) {
//   sessionData = req.session;
//   let userObj = {};
//   if (sessionData.user) {
//     userObj = sessionData.user;
//   }
//   console.log(`Get data ${userObj}`);
//   res.json(userObj);
// });

// router.get("/destroy_session", function (req, res, next) {
//   sessionData = req.session;
//   sessionData.destroy(function (err) {
//     if (err) {
//       msg = "Ada kesalahan";
//       res.json(msg);
//     } else {
//       msg = "Session destroy berhasil";
//       res.json(msg);
//     }
//   });
// });

// module.exports = router;
