import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from './Style/logo1.jpg';
import './Style/dashboard.css';

export default class Categories extends Component {


    constructor(props) {
      super(props)
    
      this.state = {
        categories:[],
        numCat : 0,
        numQuestion:0
      }
   
}

//----------- show gategory added in datatable------------
getCategory = () =>{
  axios.get(`http://localhost:8081/category`)
.then(res => {
    
  this.setState({
          categories : res.data
      })
      this.setState({
          numCat : res.data.length
      })
})
} 
getQuestion = () =>{
    axios.get(`http://localhost:8081/question`)
  .then(res => {
        this.setState({
          numQuestion : res.data.length
        })
  
  })
  
  } 

componentDidMount() {
   this.getCategory();
   this.getQuestion();
}

getId(id){
  console.log(id);
  localStorage.setItem('idCategory',id);
  this.props.history.push('/editCategory');

}
// ---------------Delete Category-------------------


  deleteCategory(id){

    axios.delete(`http://localhost:8081/category/delete/${id}`)
      .then(res => {
        console.log(res);
     
        window.location.reload(); 
 
      })
  
  }

  render() {
    const logOut =()=>{

        localStorage.removeItem('token')
        this.props.history.push('/editCategory');
        }
    return (
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
                                <th>Name</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody class="tbody">
                            {this.state.categories.map(item =>(
                                <tr>
                            <td>{item.nameCategory}</td>
                            <td>

                            <Link  onClick={()=> this.getId(item._id)} class="edit" title="Edit" data-toggle="tooltip"><i class="fa fa-edit"></i></Link>
                            <Link  onClick={(e) => this.deleteCategory(item._id, e)} class="delete" title="Delete" data-toggle="tooltip"><i class="fa fa-trash"></i></Link>
                            </td>
                            </tr>
           ))}
                            </tbody>
                        </table>
                        <a class="btn btn-primary btn-nueva" href="/addCategory"><b>+</b>ADD Categories</a>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>


    )
  }
}

