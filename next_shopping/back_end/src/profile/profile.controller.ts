import { BadRequestException, Body, Controller, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
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
    };

    @Patch('avatar/reset')
    async resetAvatar(
        @Body('id') id : string
    ) {
        if(!id) {
            throw new BadRequestException('required data is empty.');
        }
        return await this.profileService.resetAvatar(id);
    }

    @Post('email/sendcode')
    async sendEmailcode(
        @Body('id') id : string,
        @Body('newEmail') newEmail : string
    ) {
        if(!id || !newEmail) {
            throw new BadRequestException('Required Field is Empty.')
        }
        return await this.profileService.sendEmailCode(id, newEmail);
    }

    @Post('email/verify')
    async verifyEmailCode(
        @Body('id') id : string,
        @Body('newEmail') newEmail : string,
        @Body('code') code : string
    ) {
        if(!id || !newEmail || !code ) {
            throw new BadRequestException('All Field is Required.');
        }

        return await this.profileService.verifyEmailCode(id, newEmail, code);
    }
}