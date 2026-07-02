import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class ProfileService{
    constructor(private readonly supabaseService : SupabaseService){};

    async uploadAvatar(file : Express.Multer.File, id : string) {
        const fileExt = file.originalname.split('.');
        const fileName = `${id}_${Date.now()}.${fileExt}`;
        const filePath = `profile_subs/${fileName}`;

        const { error : uploadError } = await this.supabaseService.client.storage;
        
    }
}