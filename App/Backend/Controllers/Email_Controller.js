// _____________PACKAGES NODEMAILER___________
const nodemailer = require("nodemailer")

// _____________SEND MAIL___________
exports.Email = async (req, res) => {
    let text="";
    text  = req.body.text;
      const transport = nodemailer.createTransport({
      service: "gmail",
          auth: {
              user: 'tt951920@gmail.com',
              pass: 'Brief2020'
          }
      })
  
      await transport.sendMail({
          from: 'Thewinner@youcode.com',
          to: "tt951920@gmail.com",
          subject: "The Winning",
          html: `<div className="email" style="
          border: 1px solid black;
          padding: 20px;
          font-family: sans-serif;
          line-height: 2;
          font-size: 20px;
          text-align: center
          ">
          <h2>Congratulation You Are The winner</h2>
          <p>Your Gift is coupon for Netflix <p>
          <p>DXRA2142647</p>
      
           </div>
      `
      })
}

       

           
            
