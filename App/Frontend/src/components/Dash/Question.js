import {useEffect, useState} from 'react';
import './Style/dashboard.css';
import { Link,useHistory  } from 'react-router-dom';
import axios from 'axios';
import logo from './Style/logo1.jpg';

function Question() {
const history = useHistory();
//----------- show gategory added in datatable------------
const [questions , setQuestions] = useState(null);
useEffect(()=>{

  axios.get(`http://localhost:8081/question`)
    .then(function (response) {
      setQuestions(response.data)
    }).catch(function (err) {
      console.log(err);
  });
  
  })



// ---------------Delete Question-------------------

const deleteQuestion = (id)=>{
  axios.delete(`http://localhost:8081/question/delete/${id}`)
  .then(function (response) {
    console.log('item was deleted Succesfully ... ');
    
  })
  

}
const getIdQuestion = (id)=>{
  localStorage.setItem('idQuestion',id);
  history.push('/editQuestion');

}
const logOut =()=>{

    localStorage.removeItem('token')
    this.props.history.push('/editCategory');
    }
  return(
      
  <div>

<nav class="navbar fixed-top navbar-expand-md navbar-dark bg-primary mb-3">
    <div class="flex-row d-flex">
        <button type="button" class="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <img src={logo}  id="icon" alt="User Icon" />
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse" id="collapsingNavbar">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="/dashboard">Home <span class="sr-only">Home</span></a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#myAlert" data-toggle="collapse">Welcome Admin</a>
            </li>
            <li class="nav-item">
            <Link  onClick={logOut}><a class="nav-link" href="/logout" data-target="#myModal" data-toggle="modal">log out</a></Link>
            </li>
        </ul>
    </div>
</nav>
<div class="container-fluid" id="main">
    <div class="row row-offcanvas row-offcanvas-left">
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation">
            <ul class="nav flex-column sticky-top pl-0 pt-5 mt-3">
                <li class="nav-item"><a class="nav-link" href="/dashboard">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="categories">Category</a></li>
                <li class="nav-item"><a class="nav-link" href="questions">Questions</a></li>
                <li class="nav-item"><a class="nav-link" href="quiz">Games Test</a></li>
            </ul>
        </div>


        <div class="col main">
            <h1 class="display-4 d-none d-sm-block">
            Dashboard
            </h1>

                <div class="row my-12">
                <div class="col-lg-12 col-md-8">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead class="thead-inverse">
                                <tr>
                                <th>Question</th>
              <th>Answer</th>
              <th>Incorrect Answers 1</th>
              <th>Incorrect Answers 2</th>
              <th>Incorrect Answers 3</th>
              <th>Category</th>
              <th>Actions</th>
                                </tr>
                            </thead>
                            { questions && questions.map(item =>(
      <tbody>
        <tr>
        <td>{item.question}</td>
          <td>{item.correctAnswer}</td>
          <td>{item.incorrectAnswer1}</td>
          <td>{item.incorrectAnswer2}</td>
          <td>{item.incorrectAnswer3}</td>
          <td>{item.nameCategory}</td>
          <td>		

             <Link  onClick={()=> getIdQuestion(item._id)} class="edit" title="Edit" data-toggle="tooltip"><i class="fa fa-edit"></i></Link>
             {/* <Link to="/editQuestion" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></Link> */}
             <Link onClick={() => deleteQuestion(item._id)} class="delete" title="Delete" data-toggle="tooltip"><i class="fa fa-trash"></i></Link>
        </td>
        </tr>
         </tbody>
         ))}
                        </table>
                        <a class="btn btn-primary btn-nueva" href="/addQuestion"><b>+</b>ADD Question</a>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>

  )
}
export default Question;