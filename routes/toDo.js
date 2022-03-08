const { postToDo, getTodo, todoById, deleteToDo, updateToDo } = require("../controllers/toDo");
const router = require("express").Router();

router.post("/post/todo", postToDo);
router.get("/get/todo", getTodo);
router.delete("/delete/todo/:id", deleteToDo);
router.put("/put/todo/:id", updateToDo);

module.exports = router;
