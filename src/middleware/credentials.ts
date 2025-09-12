import { Response, Request, NextFunction } from "express";
import allowedOrigins from "../config/allowedOrigins";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.header("Origin");
  if (allowedOrigins.includes(origin as string)) {
    res.header("Access-Control-Allow-Credentials","true");
  }
  next();
};

export default credentials;
