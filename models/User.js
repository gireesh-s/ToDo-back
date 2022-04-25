const mongoose = require("mongoose");
const crypto = require("crypto")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    salt: String,
}, { timestamps: true }
)

// // Method to check the entered password is correct or not
UserSchema.methods.validPassword = (password,salt,passwordData) => {
  var password = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return passwordData === password;
};

UserSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing salt and password with 1000 iterations,
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

module.exports = mongoose.model( "User", UserSchema )