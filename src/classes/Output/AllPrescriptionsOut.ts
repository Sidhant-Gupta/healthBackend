
export class AllPrescriptionsOut {
  prescriptionsAll: Prescriptions[];
}

export class Prescriptions {
  doctorName:string;
  timestamp:number;
  title:string;
  prescriptionId:number;
}