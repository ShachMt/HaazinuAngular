import { CauseReferral } from "./CauseReferral";
import { Employee } from "./Employee";
import { User } from "./User";

export class Apply {
    id?: number;
    dateNow?:Date;
    employeesId?: number;
    askerId?: number;
    applyCausedId?:number
    //רמת הדחיפות
    levelUrgency?:string;
    detailsCausedRefferal?:string;
    detailsAnotherCause?:string;
    isActive?:boolean;

    employees?:Employee;
    asker?:User;
    applyCaused?:CauseReferral
}