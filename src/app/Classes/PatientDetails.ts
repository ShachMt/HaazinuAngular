import { Address } from "./Address";
import { Apply } from "./Apply";
import { DetailsAsker } from "./DetailsAsker";
import { Employee } from "./Employee";
import { Family } from "./Family";
import { MatureCharacter } from "./MatureCharacter";
import { Sector } from "./Sector";
import { Terapist } from "./Terapist";
import { User } from "./User";

export class PatientDetails {
    userId?: number;
    gender?:string;
    yearBorn?:string;
    mounth?:string;
    sectorId?: number;
    familyId?:number;
    familyPlace?: number;
    addressId?: number;
    isInstition?: boolean;
    isMatureCharacter?: boolean;
    isTherapeutic?:boolean;
    id?: number;
    terapistId?: number;
    isStillTerapist?:boolean;
    matureCharacterId?:number;
    applyId?:number;
    dateNow?:Date;
    idDetailsAsker?:number;
    fillEmloyeesId?:number;
    detailsAnotherSector?:string;
    parentPhone?:string;
    ageFillApply?:number;
    enotherParentPhone?:string;
    social?:string;
    emotional?:string;
    diagnoses?:string;
    studies?:string;
    permissionContactM?:boolean;
    permissionContactT?:boolean;
    framework?:string;  
    permissionContactTm?:boolean;
    ////////////////////////////
    fillEmloyees?:Employee;
    apply?:Apply;
    address?:Address;
    family?:Family;
    matureCharacter?:MatureCharacter;
    sector?:Sector;
    terapist?:Terapist;
    user?:User;
    idDetailsAskerNavigation?:DetailsAsker
}

