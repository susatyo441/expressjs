const router = require("express").Router();
const loginController = require("../controllers").login;
const verifyUser = require("../library/verify");
router.get("/", verifyUser.isLogout, loginController.login);
router.get("/logout", loginController.logout);
router.post("/auth", loginController.loginAuth);
module.exports = router;
