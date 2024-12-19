import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const sendOtp = async(req,res)=>{
    const {phoneNumber,sessionId} =req.body;

    if (!sessionId ) {
        return res.status(400).json({ error: "No session found for this phone number." });
    }
    // if (!sessionStore || sessionStore !== sessionId) {
    //   return res.status(400).json({ error: "Session ID mismatch" });
    // }  
   
    //   const { sessionExpiry } = sessionStore[sessionId];
    //   if(Date.now()>sessionExpiry){
    //     return res.status(400).json({error:"Session Expired"})
    //   }

    if(!phoneNumber){
        res.status(401).json({message:"Invalid Phone Number"});
    }
    const sendUrl = `${process.env.OTP_URL}/${process.env.OTP_API_KEY}/SMS/${phoneNumber}/AUTOGEN/`;
    try {
        const response =await axios.post(sendUrl);
        res.status(201).json({message:"OTP sent successfully",details:response.data});
    } catch (error) {     
        console.error("Error in sending otp",error.message);
        res.status(500).json({
            message:"Failed to send otp.Please try again"
     });
    }
}

const verifyOtp = async(req,res)=>{
    let {phoneNumber,otpToken} = req.body;
    
    if(!otpToken||!phoneNumber){
        res.status(401).json({message:"Invalid Credentials"});
    }
    const verifyUrl = `${process.env.OTP_URL}/${process.env.OTP_API_KEY}/SMS/VERIFY3/${phoneNumber}/${otpToken}`;
    
    try{
        const response = await axios.post(verifyUrl);
        res.status(201).json({message:"Logged in Succesfully",details:response.data});
    }catch(error){
        console.error("Something went wrong",error.message);
        res.status(500).json({
            message:"Something went wrong.Please try again"
     });
    }
}

export {sendOtp,verifyOtp}
