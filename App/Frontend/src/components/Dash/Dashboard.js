import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './Style/dashboard.css';
import logo from './Style/logo1.jpg';


export default class Categories extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        categories:[],
        numCat : 0,
        numQuestion:0,
        numUser:0
      }

}

//----------- show gategory added in datatable------------
getCategory = () =>{
  axios.get(`http://localhost:8081/category`)
.then(res => {

      this.setState({
          numCat : res.data.length
      })
      
})

} 


getusers = () =>{
  axios.get(`http://localhost:8081/user`)
.then(res => {

      this.setState({
          numUser : res.data.length
          
      })
      // console.log(numUser);
      
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
   this.getusers();
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


        <div class="col main pt-5 mt-3">
            <h1 class="display-4 d-none d-sm-block">
            Dashboard
            </h1>
            <div class="row mb-3">
                <div class="col-xl-3 col-sm-6 py-2">
                <a href="categories" class="a_category">
                    <div class="card bg-success text-white h-100">
                   
                        <div class="card-body bg-success">
                            <div class="rotate">
                                <i class="fa fa-user fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Categories</h6>
                            <h1 class="display-4">{this.state.numCat}</h1>
                        </div>
                       
                    </div>
                    </a>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                <a href="questions" class="a_category">
                    <div class="card text-white bg-danger h-100">
                        <div class="card-body bg-danger">
                            <div class="rotate">
                                <i class="fa fa-list fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Questions</h6>
                            <h1 class="display-4">{this.state.numQuestion}</h1>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                <a href="/dashboard" class="a_category">
                    <div class="card text-white bg-primary h-100">
                        <div class="card-body bg-primary">
                            <div class="rotate">
                                <i class="fa fa-list fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Users</h6>
                            <h1 class="display-4">{this.state.numUser}</h1>
                        </div>
                    </div>
                    </a>
                </div>
            </div>


            </div>
              
                </div>
                </div>
                {/* <div className="container-xl">

     <div className="table-responsive">
       <div className="table-wrapper">
         <div className="table-title">
           <div className="row">
             <div className="col-sm-6">
               <h2>Manage <b>Category</b></h2>
             </div>
            <div className="col-sm-6">
               <Link to="/addCategory" className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New Category</span></Link>
             
             </div>
           </div>
         </div>
         <table className="table table-striped table-hover">
           <thead>
             <tr>
               <th>Name</th>
               <th>Actions</th>
             </tr>
           </thead>
           {this.state.categories.map(item =>(
        <tbody id="row">
          <td>{item.nameCategory}</td>
          <td>

            <Link  onClick={()=> this.getId(item._id)} class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></Link>
            <Link  onClick={(e) => this.deleteCategory(item._id, e)} class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></Link>
        </td>
          </tbody>
           ))}
        </table>

      </div>
    </div>
  </div> */}
                </div>


    )
  }
}

