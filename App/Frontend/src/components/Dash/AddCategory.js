import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Style/dashboard.css';

function AddCategory() {

const history=useHistory();
const [nameCategory, setNameCategory] = useState();
const handleSubmit = (e) => {

	  e.preventDefault();
  const category = {nameCategory};
	      axios.post(`http://localhost:8081/category/add`,category)
	      	.then(res => {
		          if(res.error){
			  	return false
			}else{
				 console.log(res.data);
         history.push('/categories')
			}
		})
	}
// _____________________ Return________________
  return(
    <div>
    <div class="simple-login-container">
    <h2>Add Category</h2>
    <form id="form" data-parsley-validate onSubmit={handleSubmit}>
    <div class="row">
        <div class="col-md-12 form-group">
            <input className="form-control" type="text" placeholder="Name Category"
                value={nameCategory}
                onChange={e => setNameCategory(e.target.value)} 
          required class="form-control"/>
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
export default AddCategory;