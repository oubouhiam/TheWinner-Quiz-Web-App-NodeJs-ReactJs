
import { useHistory } from "react-router-dom";
import toastr from 'toastr';
import React, { useState } from 'react';
import axios from 'axios';
import '../Home/pages/inscrit.css';
import logo from './Style/logo1.jpg'
const Login = (props) => {

	const history = useHistory();
	const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

	const user = {userName,password};

	axios.post(`http://localhost:8081/admin/login`, user)
		.then(res => {
			console.log(res)
			if(!res.data.message){ 
			 let token= res.data.token;
			 localStorage.setItem("token", token);
			 history.push('/dashboard');
			 toastr.info('User is authenticated SuccessFully', `Welcome ${user.userName}`, {
				positionClass: "toast-top-right",
			})

			}else{
				toastr.warning(res.error, 'Username Or password invalid !!!! Please Check form !', {
                    positionClass: "toast-top-left",
                })
			}
		 
		})
	}
  return(



<html>

<body class="inscri-body">
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img src={logo} id="icon" alt="User Icon" />
          <h1>Login</h1>
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="username" 		 value={userName}
		  onChange={e => setUserName(e.target.value)}/>

          <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" required data-parsley-no-focus
		value={password} 
		onChange={e => setPassword(e.target.value)} />
          <input type="submit" className="fadeIn fourth" defaultValue="Log In" id="login-button" />
        </form>
        <div id="formFooter">
         <a className="underlineHover" href="/inscrit">Creat account</a>
        </div>
      </div>
    </div>
	</body>
</html>
  )
}
export default Login;