import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './inscrit.css';
import logo from './images/logo1.jpg'
// export default function inscrit() {

  const Inscrit = () => {




  const history = useHistory();

	const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
	const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

	const user = {firstName,lastName,userName,email,password};

	axios.post(`http://localhost:8081/user/authentication`, user)
		.then(res => {
		    if(res.error){
				return false
			}else{
				
				 console.log(res.data);
	             history.push('/sign-up')
			}
		 
		})
	}












  return (
    <body class="inscri-body">
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img src={logo} id="icon" alt="User Icon" />
          <h1>Sign Up</h1>
        </div>
        {/* Login Form */}
        <form  onSubmit={handleSubmit}>
          <input type="text" id="Name" className="fadeIn second" name="login" placeholder="First Name"				required data-parsley-no-focus
				value={firstName}
				 onChange={e => setFirstName(e.target.value)} />
          <input type="text" id="Name" className="fadeIn second" name="login" placeholder="Last Name"				required data-parsley-no-focus
			 value={lastName}
			  onChange={e => setLastName(e.target.value)} />
          <input type="text" id="Email" className="fadeIn second" name="login" placeholder="Email" 				 required data-parsley-no-focus
				value={email}
				 onChange={e => setEmail(e.target.value)}/>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="username"				required data-parsley-no-focus
				value={userName}
				 onChange={e => setUserName(e.target.value)} />
          <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" 				required data-parsley-no-focus
				value={password} 
				onChange={e => setPassword(e.target.value)}/>
          <input type="submit" className="fadeIn fourth" defaultValue="inscrit"id="login-button" />
        </form>
      </div>
    </div>
    </body>
  );
}

export default Inscrit;