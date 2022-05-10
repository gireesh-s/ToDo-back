const { userById, passwordChange, requireSignIn, isAuth } = require("../controllers/auth");
const { readProfile, getPhoto, editProfile } = require("../controllers/user");

const router = require("express").Router();

router.get("/read/profile/:userId", requireSignIn, isAuth, readProfile);
router.get("/read/photo/:userId", getPhoto);
router.put("/edit/profile/:userId", editProfile);
router.put("/change/password/:userId", requireSignIn, isAuth, passwordChange);

router.param("userId", userById);

module.exports = router;