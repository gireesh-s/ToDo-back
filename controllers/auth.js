const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const crypto = require("crypto");
const _ = require("lodash");

// Register
exports.registerUser = (req, res) => {
    console.log(req.body);
    const { password } = req.body;
    const user = new User(req.body);
    user.setPassword(password);
    user.save((err, user) => {
        if (err) {
        return res.status(400).json({
            error: err,
        });
        }
        user.password=undefined
        res.status(200).json({
        message: "Signup Successful",
        user
        });
    });
}

// LOGIN
exports.loginUser = ( req, res ) => {
    console.log(req.body);
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Email not found",
        });
      } else if (!user.validPassword(password, user.salt, user.password)) {
        return res.status(401).json({
          error: "Email and Password doesn't match",
        });
      }
      // create token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC);
  
      // create cookie
      res.cookie("t", token, { expiresIn: new Date() + 9999 });
      user.password = undefined;
      user.salt = undefined;
      res.status(200).json({
        message: "Login successful",
        token,
        user: user,
      });
    });
}

//User Signout
exports.logOutUser = (req, res) => {
    res.clearCookie("t");
    return res.json({
        message: "Signout successfull",
    });
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  });
};

exports.requireSignIn = expressJWT({
  secret: "todoproject",
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.user && req.auth && req.user._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.passwordChange = (req, res) => {
  const { email, password, newPassword } = req.body;
  User.findOne({ _id: req.user._id, email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    } else if (!user.validPassword(password, user.salt, user.password)) {
      return res.status(401).json({
        error: "Please enter your current valid password",
      });
    }
    const obj = {
      password: crypto
        .pbkdf2Sync(newPassword, user.salt, 1000, 64, `sha512`)
        .toString(`hex`),
    };

    user = _.extend(user, obj);
    user.save((error, newUser) => {
      if (error) {
        return res.status(400).json({
          error: err,
        });
      }
      newUser.password = undefined;
      newUser.salt = undefined;
      newUser.photo = undefined;
      res.status(200).json({
        message: "Password successfully updated",
        newUser,
      });
    });
  });
};