module.exports = function(app) {
  var questions = require('../Controllers/question_controller');

// ______________________show all question _________________________
app.get('/question', questions.questions);

// _______show random Question by category  ________________________
app.get('/question/:idCategory', questions.getquestionbycategory);

// ______________________get question by id__________________
app.get('/question/oneQuestion/:id', questions.getquestionbyid);

//______________________ add question_______________________________
app.post('/question/add', questions.createquestion);

//__________________ get question's category to updated_____________ 
app.get('/question/update/:id', questions.getcategoryquestion);




//______________________updating question______________________
app.put('/question/update/:id', questions.updatequestion);

//______________________deleting question______________________
app.delete('/question/delete/:id', questions.deletequestion);

}