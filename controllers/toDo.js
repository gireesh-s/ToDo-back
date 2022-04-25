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
    const todo = new ToDo({
        _id:req.params.id,
        title:req.body.title,
        description:req.body.description,
        date:req.body.date,
        time:req.body.time,
        location:req.body.location,
    })
    ToDo.updateOne({
        _id:req.params.todoId,
        userId:req.params.userId
    }, todo)
    .then(()=> {
        res.status(200).json({
            data:todo,
            message:"ToDo Updated"
        })
    }).catch((err)=>{
        res.status(400).json({
            error:err
        })
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