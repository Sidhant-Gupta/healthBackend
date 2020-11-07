import check from "check-types";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ErrorMsg } from "../classes/CommonCL";
import Repositories from "../classes/RepositoriesCL";
import { constants } from "../constants/constants"
import { User } from "../entity/User";

const router = express.Router();

router.post("/login", checkType, returnToken);

const error: ErrorMsg = {};

function checkType(req: Request, res: Response, next: NextFunction) {
  const header = req.headers;
  const regId = header.registrationid;
  // const { mobile } = req.body;
  const isValid =
    true &&
    check.string(regId);
  // &&
  // check.string(mobile);

  if (!isValid) {
    error.ERROR_MSG = "Invalid Request: Wrong Information";
    return res.status(400).send(error);
  }
  next();
}

async function returnToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers;
  const body = req.body;
  console.log("returnToken", body);
  const regid = String(header.registrationid);

  try {
    const repos = await Repositories.getInstance();
    const usersRepository = repos.usersRepository;
    let firstTime:boolean=false;
    let user = await usersRepository.findOne({ registration_id: regid });
    if (!user) {
      user = new User();
      firstTime=true;
    }
    user.name = body.name;
    // user.mobile = body.mobile;
    user.email_id = body.emailId;
    user.registration_id = regid;
    user = await usersRepository.save(user);
    const payload = {
      id: user.id,
      registration_id: user.registration_id
    };
    const signOptions = {
      issuer: "health care",
      expiresIn: "30d"
    };
    const token = jwt.sign(payload, constants.jwtSecretKey, signOptions);
    res.status(200).send({ token,firstTime });
  } catch (err) {
    error.ERROR_MSG = "Error in inserting or updating entry";
    res.status(500).send(error);
  }
}

export default router;