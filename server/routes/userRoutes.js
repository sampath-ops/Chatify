const { Register,Login } = require("../controller/authController");
const {setAvatar} = require("../controller/userController")
const router = require("express").Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/setavatar/:id", setAvatar);


module.exports = router;
