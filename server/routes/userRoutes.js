const { Register } = require("../controller/authController");
const router = require("express").Router();

router.post("/register", Register);

module.exports = router;
