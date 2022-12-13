const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { userSetter } = require("core-js/fn/symbol");

mongoose.connect(
  "mongodb+srv://user-auth:user-auth@user-auth.z2qblbu.mongodb.net/authentication?retryWrites=true&w=majority"
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/signup", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "email in use",
      });
    }
    return res.status(200).json({
      title: "signup success",
    });
  });
});

app.post("/login", (req, res, next) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err)
        return res.status(500).json({
          title: "server error",
          error: err,
        });
      if (!user) {
        return res.status(401).json({
          title: "user not found",
          error: "invalid credentials",
        });
      }
      //incorrect password
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          title: "login failed",
          error: "invalid credentials",
        });
      }
      //all are working
      let token = jwt.sign({ userId: user._id }, "secretkey");
      return res.status(200).json({
        title: "login successfull",
        token: token,
      });
    }
  );
});

app.get("/user",async (req,res)=>{
  try{
    const userData=await User.find();
    res.send(userData);
}catch(e){
    res.send(e);
}
})

app.get("/user", (req, res, next) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          email: user.email,
          name: user.name,
        },
      });
    });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
  if (error) return console.log(error);
  console.log("server running on port" + port);
});
