import { createClient } from "./client";

const supabase = createClient();

// Send Verify Code to Email
export const sendVerificationCode = async(email : string)=> {

    // 
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        // Just Send Confirm OTP Code, not Sign Up User
        options : {
            shouldCreateUser : false
        }
    });
    return { data, error }
};

// Confirm OTP Serial
export const confirmOTP = async(email : string, token : string)=> {
    const {data, error} = await supabase.auth.verifyOtp({
        email,
        token,
        type : 'signup'
    })
    return { data, error };
}

// Complete Sign Up Step 
export const completeSignUp = async(email : string, password : string, metadata : any) => {
    const { data, error } = await supabase.auth.updateUser({
        password : password,
        data : metadata
    });
    return { data, error };
}