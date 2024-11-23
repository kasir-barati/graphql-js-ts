import { NextFunction, Request, Response } from 'express';

export function ipLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip = req.ip ?? req.headers['x-forwarded-for'];

  console.log('IP: ' + ip);

  next();
}
