import { Apply } from "./Apply";
import { Employee } from "./Employee";
import { Status } from "./Status";
import { Tasks } from "./Tasks";

export class TreatmentDetails {
    applyId?: number;
    therapistId?: number;
    statusId?: number;
    dateNow?: Date;
    taskId?: number;
    documentation?: string;
    nextStepId?: number;
    dateTask?:Date;
    id?: number;
    nextEmployeesId?:number;
    nextDocumentation?:string;
    
    apply?: Apply;
    nextEmployees?:Employee
    nextStep?:Tasks;
    status?:Status;
    task?:Tasks;
    therapist?:Employee;
}