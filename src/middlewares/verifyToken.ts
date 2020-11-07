import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorMsg } from "../classes/CommonCL";
import { constants } from "../constants/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  const error: ErrorMsg = {};

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    res.locals.token = bearerToken;
  } else {
    error.ERROR_MSG = "Invalid JWT token : No Bearer Header";
    return res.status(401).send(error);
  }

  try {
    const authData = jwt.verify(res.locals.token, constants.jwtSecretKey);
    res.locals.jwtTokenData = authData;
    console.log("verifyToken/authData", authData);
    next();
  } catch (err) {
    error.ERROR_MSG = "Invalid JWT token : Tampering is detected";
    return res.status(401).send(error);
  }
}