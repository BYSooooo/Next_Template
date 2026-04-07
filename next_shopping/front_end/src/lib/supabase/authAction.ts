import { createClient } from "./client";

const supabase = createClient();

// Send Verify Code to Email
export const sendVerificationCode = async(email : string)=> {
    // Temporary Password.
    // Password setting will be finish next page.
    const tempPwd = Math.random().toString(36).slice(-12);

    const { data, error } = await supabase.auth.signUp({
        email,
        password : tempPwd,
        options : {
            emailRedirectTo : `${window.location.origin}/auth/callback`
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