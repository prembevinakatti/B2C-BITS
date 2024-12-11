const nodemailer=require("nodemailer")
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user:"vishhhhh03@gmail.com", 
      pass:"qnfmkfyzaqsspjhj",
    },
  });
  class sendmail{
        sendotp=async(email,otp)=>{
            const mailOptions = {
                from:"you should name it",
                to:email,
                subject: 'Your OTP Code for servo  ',
                text:`Your OTP code is ${otp}`,
              };
              try {
                const info = await transporter.sendMail(mailOptions);
                return { success: true, message: "OTP sent successfully to your email" };
              } catch (error) {
                console.error('Error sending OTP:', error);
                return { success: false, message: "Error in sending OTP" };
              }
        }
        sendnotification=async(data)=>{
            console.log("it reached hear")
         try {
             const mailOptions={
               from:"you should name it",
               to:data.email,
               subject:data.subject,
               text:data.text
             }
             const info = await transporter.sendMail(mailOptions);
             return { success: true, message: "sucsesuflly sent email-notification" };
         } catch (error) {
          console.error('Error sending email-notification:', error);
          return { success: false, message: "Error in sending email-notification" };
         }
        }
  }
  const mailservice =new sendmail()
  module.exports=mailservice