const ToDo = require("../models/ToDo");

exports.postToDo = (req, res) => {
    const data = req.body;
    const newToDo = new ToDo({
        ...data,
        userId: req.user.id
    });
    newToDo.save((err, data)=> {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(data)
    })
}

exports.getTodo = (req, res) => {
    ToDo.find({userId:req.params.userId})
    .exec((err, data)=>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(data)
    })
}

// Read one Todo
exports.readTodo = (req, res) => {
    return res.json(req.todo);
};

exports.deleteToDo = (req, res) => {
    ToDo.findByIdAndRemove({
        _id:req.params.todoId,
        userId:req.params.userId
    })
    .then(()=> {
        res.status(200).json({
            message: "ToDo Deleted"
        })
    }).catch((err)=>{
        res.status(400).json({
            error: err
        })
    })
}

exports.updateToDo = (req, res) => {
    ToDo.findOneAndUpdate({
        _id:req.params.todoId,
        userId:req.params.userId
    }, {
        $set: req.body
    }).exec((err, data)=>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json(data)
    })
}

exports.todoById = (req, res, next, id) => {
    ToDo.findById(id).exec((err, todo) => {
      if (err || !todo) {
        return res.status(400).json({
          error: "ToDo not found",
        });
      }
      req.todo = todo;
      next();
    });
  };