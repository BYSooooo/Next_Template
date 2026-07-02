import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Multer } from "multer";
import { ProfileService } from "./profile.service";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {};

    @Post('avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    async uploadAvatar(
        @UploadedFile() file : Express.Multer.File,
        @Body('id') id : string
    ) {
        if(!file) {
            throw new BadRequestException('No File')
        }
        if(!id) {
            throw new BadRequestException('No User ID');
        }

        const maxFileSize = 3 * 1024 * 1024;
        if(file.size > maxFileSize) {
            throw new BadRequestException('File Size Exceed.');
        }

        return await this.profileService.uploadAvatar(file, id);
    }
}