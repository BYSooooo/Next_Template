import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {};

    @Post('avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    async uploadAvatar(
        @UploadedFile() file : Express.Multer.File
    )
}