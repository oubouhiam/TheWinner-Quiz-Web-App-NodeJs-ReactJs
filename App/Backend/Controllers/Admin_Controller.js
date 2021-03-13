//__________________CALL MODEL____________________
const Admin = require('../models/admin.model.js');
//Call Packages JSON Web Token & BCRYPT
const jwt=require('jsonwebtoken');
//A library to help you hash passwords.
const bcrypt=require('bcrypt');

//------------------------User authentication---------------------
exports.Admin = (req, res) => {
    //10==saltRounds
    bcrypt.hash(req.body.password, 10, function(err, hashPassword) {
        if (err) {
          res.json({error : err})    
        }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = hashPassword;
    const adminPush = new Admin({
        firstName,
        lastName,
        userName,
        email,
        password
    });
    adminPush
      .save()
      .then(() => res.json("Admin successfully added"))
      .catch((err) => res.status(400).json("Error :" + err));
  });
}

//-------------------------login User-----------------------------

exports.AdminLogin = (req, res) => {

    let userName=req.body.userName;
    let password=req.body.password;

Admin.findOne({userName : userName})
.then(admin => {

if(admin){
    bcrypt.compare(password, admin.password, function(err, result){
        if (err) {
            res.json({
              error : err
            })
          }
       if(result){
          let token=jwt.sign({userName :userName},'tokenkey',(err,token) => {
            res.cookie("token", token)  
            res.json({
                token : token
            })
          })
       }else{
           res.json({
               message : 'password incorrect try again !!'
           })
       }
    })
}else{
    res.json({
        message : 'Admin not found'
    })
}
}).catch((err) => res.status(400).json("Error :" + err));
}

//-------------------------Logout Admin---------------------------

exports.AdminLogout = (req, res) => {
    const deconnect = res.clearCookie("token")

    res.json({
        message: 'User is Signout !!'
    })
}