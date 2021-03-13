module.exports = function(app) {
// --------------------Caling Controller File----------------- 
var Admins = require('../Controllers/Admin_Controller.js');

//------------------------User authentication---------------------
app.post('/admin/add', Admins.Admin);

//-------------------------login User----------------------
app.post('/admin/login', Admins.AdminLogin);

//-------------------------Logout Admin----------------------
app.get('/admin/logout', Admins.AdminLogout);
}