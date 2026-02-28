import { Request, Response, NextFunction } from "express";

export function responseWrapper(req: Request, res: Response, next: NextFunction) {
  res.success = function (data: any) {
    res.json({ success: true, data });
  };
  next();
}

declare global {
  namespace Express {
    interface Response {
      success: (data: any) => void;
    }
  }
}