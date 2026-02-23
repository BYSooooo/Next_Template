import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { SupabaseService } from './supabase.service';

@Global()
@Module({
    imports : [PassportModule],
    providers : [SupabaseService, JwtStrategy],
    exports : [SupabaseService]
})

export class SupabaseModule {}
