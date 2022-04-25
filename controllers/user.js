const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

//Read user Profile
exports.readProfile = (req, res) => {
    req.user.password = undefined;
    req.user.salt = undefined;
    req.user.photo = undefined;
    return res.json(req.user);
};

//Read Profile Photo
exports.getPhoto = (req, res) => {
    if (req.user.photo.data) {
      res.set("Content-Type", req.user.photo.contentType);
      return res.send(req.user.photo.data);
    } else {
      return res.status(400).json({
        error: "Photo not found",
      });
    }
};

// Edit profile
exports.editProfile = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: err,
            })
        }
        let user = req.user;
        user = _.extend(user, fields);
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.filepath);
            user.photo.contentType = files.photo.type;
        }
        user.save((err, data)=>{
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            data.password = undefined;
            data.salt = undefined;
            res.json(data);
        })
    })
}