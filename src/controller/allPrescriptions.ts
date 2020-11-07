import { NextFunction, Request, Response } from "express"
import { createQueryBuilder, getRepository } from "typeorm";

import { plainToClass } from "class-transformer";
import { ErrorMsg } from "../classes/CommonCL";
import Repositories from "../classes/RepositoriesCL";
import { AllPrescriptionsOut, Prescriptions } from "../classes/Output/AllPrescriptionsOut";

const error: ErrorMsg = {};

export default async (req: Request, res: Response, next: NextFunction) => {
  const results: AllPrescriptionsOut = plainToClass(AllPrescriptionsOut, new AllPrescriptionsOut());
  const userId = req.params.userId;
  try {

    const repos = await Repositories.getInstance();
    const dbResHistory = await repos.historyRepository
      .createQueryBuilder("history")
      .select([
        "history.trid",
        "history.drid",
        "history.date",
        "history.title"
      ])
      .where('history."uid"=:uid ', { uid: userId })
      .orderBy("history.date", "DESC")
      .getRawMany();

    let appointments = [];
    console.log("Appointments ", dbResHistory);
    for (const appointment of dbResHistory) {
      const prescription = new Prescriptions();
      prescription.prescriptionId=appointment.history_trid;
      prescription.title = appointment.history_title;
      prescription.timestamp = appointment.history_date;
      const docname = await repos.doctorRepository
        .createQueryBuilder("doc")
        .select(["doc.name"])
        .where('doc."drid"=:drid ', { drid: appointment.history_drid })
        .getOne();
      console.log("doccc ", docname.name);

      prescription.doctorName = docname.name;
     

      appointments.push(prescription);
    }
    results.prescriptionsAll = appointments;
    res.status(200).send(results);

  } catch (err) {
    console.log(err);
    error.ERROR_MSG = "Error in retrieving Data";
    res.status(500).send(error);
  }
}