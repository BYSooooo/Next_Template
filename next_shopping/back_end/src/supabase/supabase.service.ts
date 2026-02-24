import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    public client : SupabaseClient;

    constructor(private configService : ConfigService) {
        const url = this.configService.get<string>('SUPABASE_URL');
        const key = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if(!url || !key) {
            throw new Error('Error : Can not find Supabase URL or Role Key')
        }

        this.client = createClient(url, key, {
            auth : {
                autoRefreshToken : false,
                persistSession : false
            }
        })
    }

}
