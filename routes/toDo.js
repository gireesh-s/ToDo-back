const { userById, requireSignIn, isAuth } = require("../controllers/auth");
const { postToDo, getTodo, todoById, deleteToDo, updateToDo, readTodo } = require("../controllers/toDo");
const router = require("express").Router();

router.post("/post/todo/:userId", requireSignIn, isAuth, postToDo);
router.get("/get/todo/:userId", getTodo);
router.get("/read/one/todo/:userId/:todoId", requireSignIn, isAuth, readTodo);
router.delete("/delete/todo/:userId/:todoId", requireSignIn, isAuth, deleteToDo,);
router.put("/put/todo/:userId/:todoId", requireSignIn, isAuth, updateToDo);

router.param("userId", userById);
router.param("todoId", todoById);

module.exports = router;
