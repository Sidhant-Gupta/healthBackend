
export class AllPrescriptionsOut {
  prescriptionsAll: Prescriptions[];
}

export class Prescriptions {
  doctorName:string;
  timestamp:string;
  title:string;
  prescriptionId:number;
}