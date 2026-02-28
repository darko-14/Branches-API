import { AuthService } from "./auth.service";
import { LoginDTO } from "./auth.schema";
import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../../utils/errors";

export class AuthController {
    constructor(private authService: AuthService) { }

    login = async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.validatedBody as LoginDTO;
        const { message, token, user } = await this.authService.login(username, password);

        if (req.cookies['token']) throw new BadRequestError('Корисникот е веќе најавен');

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });
        res.success({ status: 200, message, user });
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        if (!req.cookies['token']) throw new UnauthorizedError('Нема најавен корисник');

        const result = await this.authService.logout();

        res.clearCookie('token');
        res.success({ status: 200, ...result });
    }
} 