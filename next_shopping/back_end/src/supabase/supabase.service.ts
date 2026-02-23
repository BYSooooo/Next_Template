import { Injectable, OnModuleInit } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService implements OnModuleInit {
    private supabase : SupabaseClient;

    onModuleInit() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if(!supabaseUrl || !supabaseKey) {
            throw new Error(`NestJS : Supabase URL or Role Key is undefined`)
        }

        this.supabase = createClient(supabaseUrl, supabaseKey, {
            auth : {
                autoRefreshToken : false,
                persistSession : false
            }
        });
        console.log("NestJS - Supabase Admin Sign in")
    }

    getClient() {
        return this.supabase
    }
}