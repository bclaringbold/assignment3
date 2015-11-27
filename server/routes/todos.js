var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var todo = require('../models/todo');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

// Create To-Do Item
router.post('/', requireAuth, function(req, res, next){
   todo.create(req.body, function(err, post){
       if (err) {
           return next(err);
       }
       res.json(post);
   }); 
});

// Read All To-Dos Items
router.get('/', requireAuth, function(req, res, next){
   todo.find(function(err, todos){
       if (err) {
           return next(err);
       }
       res.json(todos)
   }); 
});


/* READ /todos/id */
router.get('/:id', requireAuth, function(req,res, next) {
   todo.findById(req.params.id, function(err,post){
      if(err) {
        return next(err);}
       res.json(post);
   });
});

/* UPDATE /todos/:id */
router.put('/:id', requireAuth, function(req,res, next){
   todo.findByIdAndUpdate(req.params.id, req.body, function(err, post){
      if(err) {return next(err);}
       res.json(post);
   }); 
});

/* DELETE /todos/:id */
router.delete('/:id', requireAuth, function(req,res,next){
   Todo.findByIdAndRemove(req.params.id, req.body, function(err,post){
      if(err) {return next(err);}
       res.json(post);
   });
});


module.exports = router;