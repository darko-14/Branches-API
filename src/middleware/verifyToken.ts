import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../utils/config';
import { UnauthorizedError } from '../utils/errors';
const JWT_SECRET = config.JWT_SECRET;

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;
    if (!token) throw new UnauthorizedError('Не е обезбеден токен');
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        throw new  UnauthorizedError('Истечен или невалиден токен');
    }
}
