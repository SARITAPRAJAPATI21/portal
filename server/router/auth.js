const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`hello world from the server router.js`);
});

// Using Async
router.post("/register", async (req, res) => {
  console.log("register");
  const { name, email, phone, designation, password, cpassword } = req.body;
  if (!name || !email || !phone || !designation || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill details" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const user = new User({
      name,
      email,
      phone,
      designation,
      password,
      cpassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/login", async (req, res) => {
  console.log("login routes");
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
    
     if (!isMatch) {
        res.status(400).json({ error: "wrong password " });
      } else {
        res.status(201).json({ message: "user signin successfully" });
      }

    } 
    else {
      res.status(404).json({ error: "user not exits in database" });
    }

  }
   catch (err) {
    res.json({message:"Internal error in sever"})
    console.log("Internal error ");
  }
});
module.exports = router;
