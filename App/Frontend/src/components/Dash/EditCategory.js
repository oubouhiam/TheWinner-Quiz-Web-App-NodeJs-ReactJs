import { useState,useEffect } from 'react';
import axios from 'axios';
import './Style/dashboard.css';

const EditCategory =(props) => {


  const [nameCategory, setNameCategory] = useState(null);
   const idCatg=localStorage.getItem('idCategory');

   useEffect(()=>{

    axios.get(`http://localhost:8081/category/${idCatg}`)
    .then(function (response) {
     
      
      setNameCategory(response.data.nameCategory)
    
    }).catch(function (err) {
      console.log(err);
  });
  
  },[idCatg])






	const handleSubmit = (e) => {
		e.preventDefault();

    const category = {nameCategory};

    axios.put(`http://localhost:8081/category/update/${idCatg}`,category)
            
  
    
      .then(res => {
          if(res.error){
          return false
        }else{
          
           console.log(res.data);
           props.history.push('/categories')
        }
       
      })

  }


  return(
    
    <div  className="container-xl">


<div class="simple-login-container">
    <h2>Edit Category</h2>
    <form id="form" data-parsley-validate onSubmit={handleSubmit}>
    <div class="row">
        <div class="col-md-12 form-group">
          <input type="text" className="form-control"
           value={nameCategory || ''} name="nameCategory" id="nameCategory"
          //  value={}
           onChange={(e) => setNameCategory(e.target.value)}class="form-control" />
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
export default EditCategory;