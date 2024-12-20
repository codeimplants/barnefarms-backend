import axios from "axios";
import dotenv from 'dotenv'; 
dotenv.config();

function generateRandomOtp (){
    return Math.floor(100000+Math.random()*900000);
}

const randomNumber= generateRandomOtp();


// const sendDummyOtp = (req,res)=>{
//     const {phoneNumber,sessionId} =req.body;
    
//     if (!sessionId ) {
//         return res.status(400).json({ error: "No session found for this phone number." });
//     }

//     if(!phoneNumber){
//         res.status(401).json({message:"Invalid Phone Number"});
//     }

//     try {
//     if(process.env.NODE_ENV!=='production'){
//         console.log(`OTP for ${phoneNumber}: ${randomNumber}`);
//         return res.status(200).json({ otp: randomNumber, message: "OTP sent successfully." });
//     }else{
//         console.log("Failed to sent otp")
//     }    
//     } catch (error) {
//         console.error("Something went wrong",error);   
//     }
    
// }

const sendOtp = async(req,res)=>{
    const {phoneNumber,sessionId} =req.body;
    const sendUrl = `${process.env.OTP_URL}/${process.env.OTP_API_KEY}/SMS/${phoneNumber}/AUTOGEN/`;
    if (!sessionId ) {
        return res.status(400).json({ error: "No session found for this phone number." });
    }

    if(!phoneNumber){
        res.status(401).json({message:"Invalid Phone Number"});
    }

    if(process.env.NODE_ENV !=='production'){
        try{
            console.log(`OTP for ${phoneNumber}: ${randomNumber}`);
            return res.status(200).json({ otp: randomNumber, message: "OTP is" });
        }catch(error){
            console.log("Otp not send in development")
        }
    }else{
        try {
            const response =await axios.post(sendUrl);
            res.status(201).json({message:"OTP sent ",details:response.data});
    
        } catch (error) {     
            console.error("Error in sending otp",error.message);
            res.status(500).json({
                message:"Failed to send otp.Please try again"
         });
        }
    }

}

const verifyOtp = async(req,res)=>{
    let {phoneNumber,otpToken} = req.body;
    const verifyUrl = `${process.env.OTP_URL}/${process.env.OTP_API_KEY}/SMS/VERIFY3/${phoneNumber}/${otpToken}`;
    if(!otpToken||!phoneNumber){
        res.status(401).json({message:"Invalid Credentials"});
        return;
    }

    if(process.env.NODE_ENV !=="production"){
        try {
            if(parseInt(otpToken)===randomNumber){
                console.log(`OTP verified successfully!`);
                res.status(201).json({message:"Logged in Succesfully"});
            }else{
                res.status(500).json({message:`OTP invalid`})
            }
        } catch (error) {
            console.error("Something went wrong",error);
        }
    }else{
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
}

// const verifyDummyOtp = (req,res)=>{
//     const {otpToken,phoneNumber}=req.body;

//     if(!phoneNumber){
//         console.log('Wrong phone Number');
//         return;
//     }
//     if(parseInt(otpToken)!==randomNumber){
//         console.log("OTP not matched");
//     }

//     return res.status(200).json({ message: "OTP verified successfully." });
// }
export {sendOtp,verifyOtp}
