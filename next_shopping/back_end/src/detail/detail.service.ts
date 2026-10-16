import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class DetailService {
    constructor(private readonly supabaseService : SupabaseService) {};
    
}