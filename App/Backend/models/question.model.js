const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Question = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
 
    },
    correctAnswer:{
      type: String,
      required: true,
      trim: true,
    },
    incorrectAnswer1:{
       type: String,
       required: true,
       trim: true,
    },
    incorrectAnswer2:{
      type: String,
      required: true,
      trim: true,
   },
   incorrectAnswer3:{
    type: String,
    required: true,
    trim: true,
 },
    nameCategory: {
      type: String,
  },
  },
  {
    versionKey: false
}
);

const questionList = mongoose.model("Question", Question);
module.exports = questionList;
