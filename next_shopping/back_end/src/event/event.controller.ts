import { Controller, Get, Param } from "@nestjs/common";
import { EventDetailResponse, EventService } from "./event.service";

@Controller('event')
export class EventController {
    constructor(private readonly eventService : EventService) {}

    // Get /event/:id
    @Get(':id')
    async getEventDetail(@Param('id') id : string) : Promise<EventDetailResponse> {
        console.log(id)
        return await this.eventService.getEventDetail(id);
    }
}