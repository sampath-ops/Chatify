const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already exist", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already exist", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) return res.json({ msg: "Incorrect Username", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    user = user.toObject()
    delete user.password
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
