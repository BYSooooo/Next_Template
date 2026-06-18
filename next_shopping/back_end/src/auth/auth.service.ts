import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { session } from "passport";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class AuthService {
    constructor(private readonly supabaseService : SupabaseService) {}

    // Sign Up to Supabase
    async register(signUpData : any) {
        const { 
            email, password, nickname, 
            phone, countryCode, postCode, address1, address2 
        } = signUpData;

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
                {   id : userId,
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

        return { message : "Success : register", userId};
    }
    
    async checkNick(nickname : string) {
        const {count, error } = await this.supabaseService.client
            .from('Profiles')
            .select('nickname', {
                head : true,
                count : "exact",
            })
            .eq('nickname',nickname)
            
            const isDuplicated = (count ?? 0) > 0;
        if(error) {
            throw new BadRequestException(`Authorization Error : ${error.message}`)
        }
        return { 
            message : 'Success : checkNick', 
            isDuplicated : isDuplicated,
            count : count 
        }
    }

    async signInWithEmail(signInInfo : {email : string, password : string}) {
        const { data : authData,  error : authError } = await this.supabaseService.client
            .auth.signInWithPassword({
                email : signInInfo.email,
                password : signInInfo.password
            })
        
        if(authError) {
            throw new UnauthorizedException(authError.message)
        }

        const userId = authData.user.id;

        const { data : profileData, error : profileError} = await this.supabaseService.client
            .from('Profiles')
            .select('*')
            .eq('id', userId)
            .single();
        
        console.log(profileData)
        
        if(profileError) {
            throw new BadRequestException(profileError.message)
        }

        const userInform = {
            id : authData.user.id,
            email : authData.user.email,
            nickname : profileData.nickname,
            phone : profileData.phone,
            countryCode : profileData.country_code,
            postCode : profileData.post_code,
            address1 : profileData.address1,
            address2 : profileData.address2
        }

        return {
            message : 'Success : signInWithEmail',
            session : {
                ...authData.session,
                user : userInform
            }
        }
    }
}