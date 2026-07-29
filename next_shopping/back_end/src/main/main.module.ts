import { Module } from "@nestjs/common";
import { SupabaseModule } from "src/supabase/supabase.module";
import { MainController } from "./main.controller";
import { MainService } from "./main.service";

@Module({
    imports : [SupabaseModule],
    controllers : [MainController],
    providers : [MainService]
})

export class MainModule {}