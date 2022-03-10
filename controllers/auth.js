const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

// LOGIN
exports.loginUser = async ( req, res ) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        !user && res.status(400).json("Invalid User")
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(400).json("Incorrect Password");

        const accessToken = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
        )

        const { password, ...others } = user._doc;
        res.status(200).json({
            ...others,
            accessToken
        })
    } catch (err) {
        res.status(400).json(err)
    }
}