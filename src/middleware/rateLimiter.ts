import { Request, Response, NextFunction } from 'express';
import { TooManyRequestsError } from '../utils/errors';
import { config } from '../utils/config';

const rateLimitWindowMs = config.RATE_LIMIT_WINDOW_MS;
const maxRequests = config.RATE_LIMIT_MAX;
const ipStore = new Map<string, { count: number; firstRequest: number }>();

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
    if (config.NODE_ENV === 'production') {
        const ip = req.ip as string;
        const now = Date.now();
        const entry = ipStore.get(ip);

        console.log(`Rate limiter: IP=${ip}, Count=${entry?.count || 0}, FirstRequest=${entry ? new Date(entry.firstRequest).toISOString() : 'N/A'}`);

        if (!entry) {
            ipStore.set(ip, { count: 1, firstRequest: now });
            return next();
        }

        if (now - entry.firstRequest > rateLimitWindowMs) {
            ipStore.set(ip, { count: 1, firstRequest: now });
            return next();
        }

        if (entry.count >= maxRequests) {
            throw new TooManyRequestsError();
        }

        entry.count++;
    }
    next();
}
