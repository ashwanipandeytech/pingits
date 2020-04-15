const User = require('../models/user.model');

exports.create = function (req, res) {
  const user = new User({
      firstname: req.body.data.firstname,
      lastname: req.body.data.lastname,
      email: req.body.data.email,
      username: req.body.data.username,
      gender: req.body.data.gender,
      password: req.body.data.password,
      
     
  });
//console.info(user);//return false;
  user.save()
    .then(function (response) {
      return res.status(200).json({
        status: 200,
        data: response,
        message: 'Success',
        success:true
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message,
        success:false
      });
    });
}

exports.get = function (req, res) {
  User.findById(req.params.id)
    .then(function (user) {
      return res.status(200).json({
        status: 200,
        data: user,
        message: "Success"
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
}

exports.list = function (req, res) {
  User.find()
    .then(function (users) {
      return res.status(200).json({
        status: 200,
        data: users,
        message: 'Success'
      })
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
}



exports.update = function (req, res) {
  User.findById(req.params.id)
    .then(function (user) {
      user.title = req.body.data.title || user.title;
      user.body = req.body.data.body || user.body;
      user.author = req.body.data.author || user.author;
      user.date = req.body.data.date || user.date;
      user.isPublished = req.body.data.isPublished || user.isPublished;

      user.save()
        .then(function (updatedUser) {
          return res.status(200).json({
            status: 200,
            data: updatedUser,
            message: 'Success'
          });
        })
        .catch(function (err) {
          return res.status(400).json({
            status: 400,
            message: err.message
          });
        });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
}

exports.delete = function (req, res) {
  User.findById(req.params.id)
    .then(function (user) {
      user.remove()
        .then(function (deletedUser) {
          return res.status(200).json({
            status: 200,
            data: deletedUser,
            message: 'Success'
          });
        })
        .catch(function (err) {
          return res.status(400).json({
            status: 400,
            message: err.message
          });
        });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
}