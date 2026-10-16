import { Module } from "@nestjs/common";
import { SupabaseModule } from "src/supabase/supabase.module";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";

@Module({
    imports : [SupabaseModule],
    controllers : [EventController],
    providers : [EventService]
})
export class EventModule {}