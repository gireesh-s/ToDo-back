const ToDo = require("../models/ToDo");

exports.postToDo = (req, res) => {
    const { title, description, date, time } = req.body;
    const newToDo = new ToDo(req.body);
    newToDo.save((err, data)=> {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({data})
    })
}

exports.getTodo = (req, res) => {
    ToDo.find()
    .exec((err, data)=>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({data})
    })
}

exports.deleteToDo = (req, res) => {
    ToDo.findByIdAndRemove({_id:req.params.id})
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
        time:req.body.time
    })
    ToDo.updateOne({_id:req.params.id}, todo)
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