import type { Request, Response, NextFunction } from 'express';

export const pathLogger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method}: ${req.originalUrl}`);
  next();
};
