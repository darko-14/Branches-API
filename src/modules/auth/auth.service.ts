
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthResponseDto, users } from './auth.types';
import { UnauthorizedError } from '../../utils/errors';
import { Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = '1h';

export class AuthService {
    async login(username: string, password: string): Promise<AuthResponseDto> {
        const user = users.find(u => u.username === username);
        if (!user) throw new UnauthorizedError();

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedError();

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return { message: 'Успешена најава', token, user: { id: user.id, username: user.username } };
    }

    async logout(): Promise<AuthResponseDto> {
        return { message: 'Успешно одјавување' };
    }
}