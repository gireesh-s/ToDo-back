const { postToDo, getTodo, todoById, deleteToDo, updateToDo } = require("../controllers/toDo");
const { verifyToken } = require("./verifyToken");
const router = require("express").Router();

router.post("/post/todo/:userId", verifyToken, postToDo);
router.get("/get/todo/:userId", verifyToken, getTodo);
router.delete("/delete/todo/:userId/:todoId", verifyToken, deleteToDo);
router.put("/put/todo/:userId/:todoId", verifyToken, updateToDo);

module.exports = router;
