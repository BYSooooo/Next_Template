import { Controller, Get } from "@nestjs/common";
import { MainBanner, MainService } from "./main.service";

@Controller('main')
export class MainController {
    constructor(private readonly mainService : MainService) {}

    @Get('banners')
    async getBanners(): Promise<MainBanner[]> {
        return await this.mainService.getActiveBanners()
    }
}