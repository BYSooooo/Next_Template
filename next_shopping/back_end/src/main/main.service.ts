import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class MainService {
    constructor(private readonly supabaseService : SupabaseService) {
        
    }
}