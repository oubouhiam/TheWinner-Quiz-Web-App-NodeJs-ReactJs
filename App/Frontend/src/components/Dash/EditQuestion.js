import React, { useState,useEffect} from 'react';
import {useHistory } from "react-router-dom";
import axios from 'axios';
import './Style/dashboard.css';

function EditQuestion() {
  const history = useHistory();
  const [question, setQuestion] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [incorrectAnswer1, setIncorrectAnswer1] = useState();
  const [incorrectAnswer2, setIncorrectAnswer2] = useState();
  const [incorrectAnswer3, setIncorrectAnswer3] = useState();
  const [nameCategory, setNameCategory] = useState();

  const idQts=localStorage.getItem('idQuestion');

  let idCategory;
// ---------------------get question to update-----------------------------
   useEffect(()=>{

    axios.get(`http://localhost:8081/question/${idQts}`)
    .then(function (response) {
     
      setQuestion(response.data.question)
      setCorrectAnswer(response.data.correctAnswer)
      setIncorrectAnswer1(response.data.incorrectAnswer1)
      setIncorrectAnswer2(response.data.incorrectAnswer2)
      setIncorrectAnswer3(response.data.incorrectAnswer3)
      setNameCategory(response.data.nameCategory)
      // const [, setNameCategory] = useState("");
    
    }).catch(function (err) {
      console.log(err);
  });
  
  })
// -----------------------update question---------------------------
	const handleSubmit = (e) => {
		e.preventDefault();
    var id = idCategory.value;
    const Question = {question,correctAnswer,incorrectAnswer1,incorrectAnswer2,incorrectAnswer3,nameCategory : id};

    axios.put(`http://localhost:8081/question/update/${idQts}`,Question)
      .then(res => {
        if(res.error){
          return false
        }else{
          console.log(res.data);
          history.push('/questions')
        }
       
      })

  }
// get all category and show it in select
useEffect(()=>{

  axios.get(`http://localhost:8081/category`)
  .then(function (response) {
      
    setNameCategory(response.data)
  
  }).catch(function (err) {
    console.log(err);
});

},[])





  return(
    

    <div className="container-xl">

    <div class="simple-login-container">
        <h2>Add Question</h2>
        <form id="form" data-parsley-validate onSubmit={handleSubmit}>
    <div class="row">
        <div class="col-md-12 form-group">
            <input className="form-control" id="name" type="text"
          placeholder="question" required 
          value={question}
          onChange={e => setQuestion(e.target.value)} class="form-control"/>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 form-group">
        <input className="form-control" id="name" type="text" placeholder="Correct Answer" required 
            value={correctAnswer}
            onChange={e => setCorrectAnswer(e.target.value)} class="form-control"/>
        </div>
    </div>


    <div class="row">
        <div class="col-md-12 form-group">
        <input className="form-control" id="name" type="text" placeholder="Incorrect Answer 1" required 
            value={incorrectAnswer1}
            onChange={e => setIncorrectAnswer1(e.target.value)} class="form-control"/>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 form-group">
        <input className="form-control" id="name" type="text" placeholder="Incorrect Answer 2" required 
            value={incorrectAnswer2}
            onChange={e => setIncorrectAnswer2(e.target.value)} class="form-control"/>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
        <input className="form-control" id="name" type="text" placeholder="Incorrect Answer 3" required 
            value={incorrectAnswer3}
            onChange={e => setIncorrectAnswer3(e.target.value)}class="form-control" />
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
        <select className="form-control " ref={(e) => idCategory = e}  id="selectbtn" name="nameCategory" class="form-control">
        <option value="">Categories</option>
        {nameCategory && nameCategory.map(Categorie =>(
                <option key={Categorie._id} value={Categorie._id} >{Categorie.nameCategory}</option>
              ))}   
        </select>  
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
            <input type="submit" id="AddCatg" class="btn btn-block btn-login"/>
        </div>
    </div>
    </form>
</div>

</div>

  )
}
export default EditQuestion;