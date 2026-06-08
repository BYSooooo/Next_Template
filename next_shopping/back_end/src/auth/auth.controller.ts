import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { type Response } from 'express';

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
            @Res({ passthrough : true }) res: Response ) {
        const result = await this.authService.signInWithEmail(signInData);

        const accessToken = result?.session.access_token;
        const refreshToken = result?.session.refresh_token;

        // Add Access Token to Cookie
        res.cookie('sb-access-token', accessToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'lax',
            maxAge : 60 * 60 * 1000,
            path : '/'
        });

        // Add Refresh Token to Cookie
        res.cookie('sb-refresh-token', refreshToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'lax',
            maxAge : 7 * 24 * 60 * 60 * 1000,
            path : '/'
        })

        return res.status(HttpStatus.OK).json({
            message : result.message,
            user : result.session?.user
        });
    }

}