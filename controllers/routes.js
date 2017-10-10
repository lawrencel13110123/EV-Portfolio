// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var logger = require("morgan");
var path = require("path");
var Project = require("../models/project.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  
  app.get("/", function(req, res) {

     Project.find({}, function(err, doc) {
        if (err) {
          console.log(err)
        } else {
          console.log(doc)
          var hbsObject = {project: doc}
          res.render('index', hbsObject)
        }
     }); 
  });

   app.get("/more/:id", function(req, res) {

     Project.find({"_id": req.params.id}, function(err, doc) {
        if (err) {
          console.log(err)
        } else {
          console.log(doc)
          var hbsObject = {project: doc}
          res.render('info', hbsObject)
        }
     }); 
  });

  app.get("/dashboard", ensureAuthenticated, function(req, res) {
     Project.find({}, function(err, doc) {
        if (err) {
          console.log(err)
        } else {
          console.log(doc)
          var hbsObject = {project: doc}
          res.render('dashboard', hbsObject)
        }
     }); 
  });

  function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      res.redirect('/login');
    }
  }

  app.get('/delete/:id', function(req, res) {
    Project.findOne({"_id": req.params.id}).remove().exec(function (err, remove) {
      if (err) {
        console.log(err)
      } else {
        console.log(remove)
        res.redirect("/dashboard")
      }
    })
  }); 

  app.post('/update/:id', function(req, res) {

    Project.findOneAndUpdate({_id: req.params.id}, {$set:{title:req.body.title, about: req.body.about, logo: req.body.logo, imgOne: req.body.imgOne, imgTwo: req.body.imgTwo, imgThree: req.body.imgThree, imgFour: req.body.imgFour, imgFive: req.body.imgFive}}, {new: true}, function(err, doc){
        if(err){
          console.log(err)
        }
          console.log(doc);
          res.redirect("/dashboard")
    });
  }); 

  app.post('/create', function(req, res) {
    var newProject = {
      title: req.body.title, 
      about: req.body.about, 
      logo: req.body.logo, 
      imgOne: req.body.imgOne, 
      imgTwo: req.body.imgTwo, 
      imgThree: req.body.imgThree, 
      imgFour: req.body.imgFour, 
      imgFive: req.body.imgFive
    }

    var entry = new Project (newProject); 

    entry.save(function(err, doc) {
        // log any errors
        if (err) {
          console.log(err);
        } 
        else {
          console.log(doc)
          res.redirect("/dashboard")
        }
    });
 
  }); 


};


