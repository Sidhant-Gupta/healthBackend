import { NextFunction, Request, Response } from "express"
import { createQueryBuilder, getRepository } from "typeorm";

import { plainToClass } from "class-transformer";
import { ErrorMsg } from "../classes/CommonCL";
import Repositories from "../classes/RepositoriesCL";
import { AllPrescriptionsOut, Prescriptions } from "../classes/Output/AllPrescriptionsOut";
import { PrescriptionOut } from "../classes/Output/PrescriptionOut";

const error: ErrorMsg = {};

export default async (req: Request, res: Response, next: NextFunction) => {

  const result: PrescriptionOut = plainToClass(PrescriptionOut, new PrescriptionOut());
  const presId = req.params.presId;
  try {

    const repos = await Repositories.getInstance();
    const dbResPrescription = await repos.historyRepository
      .createQueryBuilder("history")
      .select([
        "history.drid",
        "history.date",
        "history.title",
        "history.description",
        "history.medicines"
      ])
      .where('history."trid"=:presId ', { presId: presId })
      .getOne();

    console.log("Appointments ", dbResPrescription);
    result.description = dbResPrescription.description;
    result.medicines = dbResPrescription.medicines;
    result.timestamp = dbResPrescription.date;
    result.title = dbResPrescription.title;

    const docname = await repos.doctorRepository
      .createQueryBuilder("doc")
      .select(["doc.name"])
      .where('doc."drid"=:drid ', { drid: dbResPrescription.drid })
      .getOne();
    console.log("doccc ", docname.name);
    result.doctorName = docname.name;


    res.status(200).send(result);

  } catch (err) {
    console.log(err);
    error.ERROR_MSG = "Error in retrieving Data";
    res.status(500).send(error);
  }
}