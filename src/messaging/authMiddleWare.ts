import { NextFunction, Request, Response } from "express";
import { env } from "../infrastrucre/env";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header('PUBSUB_API_KEY');
  return !header || header !== env.pubSubApiKey
    ? res.status(401).end()
    : next();
};
