module.exports = function(app) {
	const cors = require("cors")
	// --------------------Caling Controller File----------------- 
	var Emails = require('../Controllers/Email_Controller.js');
	// --------------------Send Mail-----------------
	app.post('/send_mail', cors(),Emails.Email);

}