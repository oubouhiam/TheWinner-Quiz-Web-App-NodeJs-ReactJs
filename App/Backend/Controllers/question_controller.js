//__________________CALL MODEL____________________
const question = require('../models/question.model');

// ______________________show all question ______________________
exports.questions = (req, res) => {
  question.find()
    //Let Us to reference other Collections
    // .populate('nameCategory')
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json("Error :" + err));
};

// ______________________show random Question by category  _____________________
exports.getquestionbycategory = (req, res) => {
  question.find({
      nameCategory: req.params.idCategory
    })
    .then(question => {
      let randomQuestion = question[Math.floor(Math.random() * question.length)];
      res.send(randomQuestion);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving question."
      });
    });
};

// ______________________get question by id__________________
exports.getquestionbyid = (req, res) => {
  question.findById(req.params.id)
    .then((Question) => res.json(Question))
    .catch((err) => res.status(400).json("Error :" + err));
};

//______________________ add question______________________
exports.createquestion = (req, res) => {
  const Question = new question({
    question: req.body.question,
    correctAnswer: req.body.correctAnswer,
    incorrectAnswer1: req.body.incorrectAnswer1,
    incorrectAnswer2: req.body.incorrectAnswer2,
    incorrectAnswer3: req.body.incorrectAnswer3,
    nameCategory: req.body.nameCategory,
  });
  // Save to the MongoDB
  Question.save().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).json({
      message: "Fail!",
      error: err.message
    });
  });
};

//__________________ get question's category to updated__________________ 
exports.getcategoryquestion = (req, res) => {
  question.findById(req.params.id)
    .populate('nameCategory')
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json("Error :" + err));
}

//______________________ UPDATE a question______________________
exports.updatequestion = (req, res) => {
  question.findByIdAndUpdate(req.params.id, {
      question: req.body.question,
      correctAnswer: req.body.correctAnswer,
      incorrectAnswer1: req.body.incorrectAnswer1,
      incorrectAnswer2: req.body.incorrectAnswer2,
      incorrectAnswer3: req.body.incorrectAnswer3,
      nameCategory: req.body.nameCategory,
    })
    .then(() => res.status(201).json("Question updated successfully"))
    .catch((err) => res.status(400).json("Error :" + err));
}

//______________________deleting question______________________
exports.deletequestion = (req, res) => {
    const {id} = req.params;
  question.findOneAndDelete({ _id: id})
    .exec((err, post) => {
      if (err)
        return res.status(500).json({
          code: 500,
          message: 'There was an error deleting the Question',
          error: err
        })
      res.status(200).json({
        code: 200,
        message: 'Question deleted Succesfully',
        deletedPost: post
      })
    });
}