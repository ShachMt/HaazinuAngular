import { Apply } from "./Apply";
import { PatientDetails } from "./PatientDetails";
import { TreatmentDetails } from "./TreatmentDetails";

export class PatientApply {
apply:Apply=new Apply();
patientDetails?:PatientDetails;
treatment?:TreatmentDetails;
dateEndTreatment:string="";
nameEndTerapist:string="";
isActive?:string="";
}