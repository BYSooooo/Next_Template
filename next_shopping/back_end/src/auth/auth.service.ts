import { BadRequestException, Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class AuthService {
    constructor(private readonly supabaseService : SupabaseService) {}

    async register(signUpData : any) {
        const { 
            email, password, nickname, 
            phone, countryCode, postCode, address1, address2 
        } = signUpData;

        console.log(signUpData)
        // STEP 1: Sign Up Account to Supabase Auth
        const { data : authData, error : authError} = await this.supabaseService.client.auth.signUp({
            email,
            password
        });

        if(authError) {
            throw new BadRequestException(`Authorize Error : ${authError.message}`)
        };

        const userId = authData.user?.id;

        if(!userId) {
            throw new BadRequestException(`Authorize Error : Can not create User ID`);
        }

        // STEP 2: Insert User Data into Supabase Table
        const { error : profileError } = await this.supabaseService.client
            .from('Profiles')
            .insert([
                {
                    id : userId,
                    nickname,
                    phone,
                    country_code : countryCode,
                    post_code : postCode,
                    address1 : address1,
                    address2 : address2,
                    modified_at : new Date()
                }
            ])
        
        if(profileError) {
            throw new BadRequestException(`Authorize Error : ${profileError.message}`)
        }

        return { message : "Success : Sign Up", userId};

    }
}