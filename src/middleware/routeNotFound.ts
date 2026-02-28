import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors";

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
    throw new NotFoundError();
}