module.exports = function(app) {

 
// --------------------Caling Controller File----------------- 
var users = require('../Controllers/user_Controller.js');


// --------------------show all Users -----------------
app.get('/user', users.users);
  
//------------------------User authentication---------------------
app.post('/user/authentication', users.Addusers);

//-------------------------login User----------------------
app.post('/user/login', users.userLogin);

//------------------update User----------------------
app.put('/user/update/:id', users.UpdateUser);
  
  
//------------------delete User----------------------
  app.delete('/user/delete/:id', users.UserDelete);      
    
//------------------Logout User--------------------
app.get('/user/logout', users.userLogout);  

}
