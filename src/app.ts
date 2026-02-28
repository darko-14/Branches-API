
import 'reflect-metadata';
import express from "express";
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes'
import branchRoutes from './modules/branches/branches.routes'
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { rateLimiter } from "./middleware/rateLimiter";
import { verifyToken } from "./middleware/verifyToken";
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { routeNotFound } from './middleware/routeNotFound';
import { responseWrapper } from './middleware/responseWrapper';
import { config } from './utils/config';

const app = express();

app.use(helmet())

app.use(cors({
    origin: config.CORS_ORIGIN,
    methods: ['GET'],
    credentials: true
}))

app.use(morgan('dev'))

app.use(express.json());
app.use(cookieParser());

app.use(rateLimiter)

app.use(responseWrapper)

app.use('/auth', authRoutes)
app.use('/api/branches', verifyToken, branchRoutes)

app.use(routeNotFound);
app.use(globalErrorHandler);

export default app;