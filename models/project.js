var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ProjectSchema = new Schema({
  // title of project
  title: {
    type: String,
    required: true
  },
  //description of project
  about: {
    type: String,
    required: true
  },
  // main image of project
  logo: {
    type: String,
    required: true
  },
  //sub images of project
  imgOne: {
    type: String
  },
  imgTwo: {
    type: String
  },
  imgThree: {
    type: String
  },
  imgFour: {
    type: String
  },
  imgFive: {
    type: String
  }
});

// Create the Article model with the ArticleSchema
var Project = mongoose.model("projects", ProjectSchema);

// Export the model
module.exports = Project;
