import { BadRequestException, Body, Controller, Get, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
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
        @Body('newEmail') newEmail : string
    ) {
        if(!newEmail) {
            throw new BadRequestException('Required Field is Empty.')
        }
        return await this.profileService.sendEmailCode(newEmail);
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

    @Get('nickname/check')
    async checkNickname(@Query('nickname') nickname : string) {
        if(!nickname) {
            throw new BadRequestException('Please Input Nickname')
        }
        return await this.profileService.checkNickname(nickname)
    }

    @Patch('nickname')
    async updateNickname(
        @Body('id') id : string, 
        @Body('nickname') nickname : string
    ) {
        if(!id || !nickname) {
            throw new BadRequestException('required info is empty : User ID or Nickname')
        }
        return await this.profileService.updateNickname(id, nickname);
    }

    @Patch('password')
    async changePassword(
        @Body('email') email : string,
        @Body('curPassword') curPassword : string,
        @Body('newPassword') newPassword : string
    ) {
        if(!email || !curPassword || !newPassword) {
            throw new BadRequestException('Please enter all your password information.')
        }

        return await this.profileService.changePassword(email, curPassword, newPassword);
    }
}