import { BadRequestException, Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class ProfileService{
    constructor(private readonly supabaseService : SupabaseService){};

    async uploadAvatar(file : Express.Multer.File, id : string) {
        const fileExt = file.originalname.split('.');
        const fileName = `${id}_${Date.now()}.${fileExt}`;
        const filePath = `profile_subs/${fileName}`;

        const { error : uploadError } = await this.supabaseService.client.storage
            .from('avatars')
            .upload(filePath, file.buffer, {
                contentType : file.mimetype,
                cacheControl : '3600',
                upsert : true
            });

        if(uploadError) {
            throw new BadRequestException(uploadError.message);
        }

        const { data : { publicUrl } } = await this.supabaseService.client.storage
            .from('avatars')
            .getPublicUrl(filePath);
        
        const { error : profileError } = await this.supabaseService.client
            .from('Profiles')
            .update({ avatar_url : publicUrl})
            .eq('id', id);
        
        if(profileError) {
            throw new BadRequestException(profileError.message)
        }

        return {
            message : 'Success : uploadAvatar',
            avatarUrl : publicUrl
        }
    };

    async resetAvatar(id : string) {
        const { error } = await this.supabaseService.client
            .from('Profiles')
            .update({ avatar_url : null})
            .eq('id', id);
        
        if(error) {
            throw new BadRequestException(error.message);
        }

        return {
            message : 'Success : resetAvatar',
            avatarUrl : null
        }
    }

    // private otpStorage = new Map<string, { code: string, expiry : number}>();

    async sendEmailCode(newEmail: string) {
        const { data, error } = await this.supabaseService.client.auth.updateUser({
            email : newEmail
        })
        
        if(error) {
            throw new BadRequestException(error.message);
        }

        return { message : 'Success : sendEmailCode' }
            

    }

    async verifyEmailCode(id: string, newEmail : string, code : string) {
        const { data , error } = await this.supabaseService.client.auth
            .verifyOtp({ 
                email : newEmail, 
                token : code, 
                type : 'email_change'
            });

        if(error) {
            throw new BadRequestException(error.message);
        };

        const { error : dbError } = await this.supabaseService.client
            .from('Profiles')
            .update({ email : newEmail})
            .eq('id', id);

        if(dbError) {
            throw new BadRequestException(dbError.message);
        }

        return {
            message : 'Success : verifyEmailCode',
            email : data.user?.email || newEmail
        };
        
    }

    async checkNickname(nickname : string) {
        const nickRegex = /^[a-zA-Z0-9]{5,12}$/;
        
        if(!nickRegex.test(nickname)) {
            throw new BadRequestException('Nicknames can only be written in 5-12 characters in English or by numbers.')
        };

        const { data, error } = await this.supabaseService.client
            .from('Profiles')
            .select('id')
            .eq('nickname', nickname)
            .maybeSingle();
        
            if(error) {
                throw new BadRequestException(error.message);
            }

            const isDuplicated = !!data;

            return {
                isDuplicated,
                message : isDuplicated ? 'Already used Nickname' : 'available Nickname'
            }
    }

    //...

}