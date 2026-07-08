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
            .from('profile')
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
}