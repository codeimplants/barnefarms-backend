import express from 'express';
import {sendOtp,verifyOtp } from '../controllers/otpController.js';

const router  = express.Router();

router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);

// router.route('/send-dummyotp').post(sendDummyOtp);
// router.route('/verify-dummyotp').post(verifyDummyOtp);
export default router;