
import { Request, Response, NextFunction } from 'express';
import { config } from '../utils/config';

export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err.code || 500;
    const message = err.message || 'Внатрешна серверска грешка';
    const stack = config.NODE_ENV === 'production' ? undefined : err.stack;
    const timestamp = new Date().toISOString();

    res.status(status).json({
        success: false,
        error: {
            status,
            message,
            // timestamp,
            // ...(stack && { stack })
        }
    });
}
