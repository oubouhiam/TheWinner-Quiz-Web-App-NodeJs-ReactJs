//__________________CALL MODEL____________________
const users = require('../models/users.model.js');
//Call Packages JSON Web Token & BCRYPT
const jwt=require('jsonwebtoken');
//A library to help you hash passwords.
const bcrypt=require('bcrypt');

// --------------------show all Users ----------------------------
exports.users = (req, res) => {
    users.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error :" + err));
};

//------------------------User authentication---------------------
  exports.Addusers = (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hashPassword) {
        if (err) {
          res.json({error : err})
        }
  const User = new users({
     firstName : req.body.firstName,
     lastName : req.body.lastName,
     userName : req.body.userName,
     email : req.body.email,
     password : hashPassword
});
User.save().then(() => res.status(201).json("Uers Added successfully"))
            .catch((err) => res.status(400).json("Error :" + err));
        })
    }

//-------------------------login User-----------------------------
exports.userLogin = (req, res) => {
    let userName=req.body.userName;
    let password=req.body.password;
users.findOne({userName : userName})
.then(user => {
if(user){
    bcrypt.compare(password, user.password, function(err, result){
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
        message : 'User not found'
    })
}
}).catch((err) => res.status(400).json("Error :" + err));
}

//------------------update User-----------------------------------
exports.UpdateUser = (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hashPassword) {
        if (err) {
          res.json({error : err})       
        }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    // Validate
    if(!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).send({
          message: "filde content can not be empty"
      });
  }
       users.findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
  
      })

      .then(User => {
        if(!User) {
  
          return res.status(404).send({
            message: "User not found with id " + req.params._id
        });
  
        }
        res.status(201).json("Uers UPDATED successfully");
      }).catch(err => {
  
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error updating User with id " + req.params.id
        });
        })
    });
}

//------------------delete User----------------------------------- 
exports.UserDelete = (req, res) => {
    users.findByIdAndRemove(req.params.id)
      .then(User=> {
        if (!User) {
          return res.status(404).send({
            message : "User not found with id " + req.params.id
          });
        }
        res.send({
          message : "User deleted successfully !" });
      }).catch(err =>{
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      
          return res.status(404).send({
            message : 'User not found with id ' + req.params.id
          });
        }
        return res.status(404).send({
          message : 'Could not delete note with id ' + req.params.id
          });
    })
}

//------------------Logout User-----------------------------------

exports.userLogout = (req, res) => {
      const deconnect = res.clearCookie("token")
      res.json({
          message: 'User is Signout !!'
      })
  }



