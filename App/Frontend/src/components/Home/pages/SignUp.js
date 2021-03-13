// import React from 'react';
import './signUp.css';
import logo from './images/logo1.jpg'
import axios from 'axios';
import React, { useState } from 'react';

export default function SignUp(props) {



	const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

	const user = {userName,password};

	axios.post(`http://localhost:8081/user/login`, user)
		.then(res => {
		    if(res.error){
				return false
				
			}else{
				// console.log(res.data.token);

				let token = res.data.token;
		
				localStorage.setItem("token", token);
				 console.log(res.data);

				 if(!token) {
					 alert('User name or password invalid !!!!! try again')
					return <SignUp/>
				  }else{
					props.history.push('/quiz')
				  }
	            
			}
		 
		})
	}









  return (
    <body class="inscri-body">
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img src={logo} id="icon" alt="User Icon" />
          <h1>Login</h1>
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="username" onChange={e => setUserName(e.target.value)}/>
          <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" required data-parsley-no-focus
			 value={password}
			 onChange={e => setPassword(e.target.value)} />
          <input type="submit" className="fadeIn fourth" defaultValue="Log In" id="login-button" />
        </form>
        {/* Remind Passowrd */}
        <div id="formFooter">
         <a className="underlineHover" href="/inscrit">Creat account</a>
        </div>
      </div>
    </div>
	</body>
  );
}
