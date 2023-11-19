import { Request, Response, NextFunction } from "express";

const getClientIp = (req: Request) => {
  const forwardedFor = req.headers["x-forwarded-for"] as string;
  const clientIP = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : req.ip || "";

  const ipv4Address = extractIPv4(clientIP);

  return ipv4Address || "";
};

const extractIPv4 = (ip: string) => {
  const ipv4Regex = /(\d+\.\d+\.\d+\.\d+)/;
  const match = ip.match(ipv4Regex);
  return match ? match[0] : null;
};

const ipHandler = (req: Request, res: Response, next: NextFunction) => {
  req.clientIp = getClientIp(req);
  next();
};

export default ipHandler;
