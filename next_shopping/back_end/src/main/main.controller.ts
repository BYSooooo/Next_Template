import { Controller, Get, Param, Query } from "@nestjs/common";
import { MainBanner, MainService } from "./main.service";

@Controller('main')
export class MainController {
    constructor(private readonly mainService : MainService) {}

    @Get('banners')
    async getBanners(
        @Query('type') type? : 'slider' | 'middle'  
    ): Promise<MainBanner[]> {
        return await this.mainService.getBannersByType(type || 'slider')
    }

    @Get('curations')
    async getMainCurations() {
        return await this.mainService.getMainCurations();
    }

    @Get('curations/:id')
    async getCurationDetail(@Param('id') id: string) {
        return await this.mainService.getCurationDetail(id);
    }
}
