import { createClient } from "./client";

const supabase = createClient();

// Send Verify Code to Email
export const sendVerificationCode = async(email : string)=> {
    const { data, error} = await supabase.auth.signInWithOtp({
        email,
        options : {
            shouldCreateUser : true
        }
    });
};

// Confirm OTP Serial
export const confirmOTP = async(email : string, token : string)=> {
    return await supabase.auth.verifyOtp({
        email,
        token,
        type : 'email'
    })
}