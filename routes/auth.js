const { registerUser, loginUser, logOutUser } = require("../controllers/auth");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);

module.exports = router;