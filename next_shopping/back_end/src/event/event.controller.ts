import { Controller, Get, Param } from "@nestjs/common";
import { EventDetailResponse, EventService } from "./event.service";

@Controller('event')
export class EventController {
    constructor(private readonly eventService : EventService) {}

    // Get /event/:id
    @Get(':id')
    async getPromodetail(@Param('id') promoId : string) : Promise<EventDetailResponse> {
        console.log(promoId)
        return await this.eventService.getPromoDetail(promoId);
    }
}