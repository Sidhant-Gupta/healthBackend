import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm";

import { plainToClass } from "class-transformer";
import { ErrorMsg } from "../classes/CommonCL";
import { DetailsIn } from "../classes/Input/DetailsIn";
import Repositories from "../classes/RepositoriesCL";

const error: ErrorMsg = {};

export default async (req: Request, res: Response, next: NextFunction) => {
  const input = plainToClass(DetailsIn, req.body);
  const userId = res.locals.jwtTokenData.id;
  try {
    const repos = await Repositories.getInstance();
    const usersRepository = repos.usersRepository;
    let user = await usersRepository.findOne({ id:userId });

    if(!user){
      res.status(500).send("User id not found");
    }
    user.age=input.age;
    user.blood_group=input.bloodGroup;
    user.height=input.height;
    user.weight=input.weight;

    user = await usersRepository.save(user);
    res.status(200).send("Success");

  } catch (err) {
    console.log(err);
    error.ERROR_MSG = "Error in updating Data";
    res.status(500).send(error);
  }
}