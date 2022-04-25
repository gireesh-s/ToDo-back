const { userById } = require("../controllers/auth");
const { readProfile, getPhoto, editProfile } = require("../controllers/user");

const router = require("express").Router();

router.get("/read/profile/:userId", readProfile);
router.get("/read/photo/:userId", getPhoto);
router.put("/edit/profile/:userId", editProfile);

router.param("userId", userById);

module.exports = router;