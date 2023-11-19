import { Request, Response, NextFunction } from "express";

const getClientIp = (req: Request) => {
  return (req.headers["x-forwarded-for"] || req.ip || "") as string;
  //return clientIP.split(",")[1].trim();
};

const ipHandler = (req: Request, res: Response, next: NextFunction) => {
  req.clientIp = getClientIp(req);
  next();
};

export default ipHandler;
