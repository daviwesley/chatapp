import { Request, Response, NextFunction } from "express";
import logger from "../logger";

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    logger.info(`${request.method} ${request.path}`);
    next();
  }

export default loggerMiddleware