import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('signup')
    async signUp(@Body() signupData : any) {
        return await this.authService.register(signupData)
    }

    @Get('checkNick')
    async checkNick(@Query('nickname') nickname : string) {
        return await this.authService.checkNick(nickname);
    }

    @Post('signInWithEmail')
    async signInWithEmail(
            @Body() signInData : {email : string, password : string},
            @Res() res: Response ) {
        const result = await this.authService.signInWithEmail(signInData);

        const accessToken = result?.session.access_token;
        const refreshToken = result?.session.refresh_token;

        res.cookie()
    }

}