const { Register,Login } = require("../controller/authController");
const {setAvatar,getAllUsers} = require("../controller/userController")
const router = require("express").Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id",getAllUsers)

module.exports = router;
