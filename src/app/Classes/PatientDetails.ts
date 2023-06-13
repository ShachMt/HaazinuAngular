import { Address } from "./Address";
import { Apply } from "./Apply";
import { DetailsAsker } from "./DetailsAsker";
import { Employee } from "./Employee";
import { Family } from "./Family";
import { MatureCharacter } from "./MatureCharacter";
import { Sector } from "./Sector";
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
    isContact?:string;
    id?: number;
    therapeuticId?: number;
    isStillTerapist?:boolean;
    matureCharacterId?:number;
    applyId?:number;
    dateNow?:Date;
    idDetailsAsker?:number;
    fillEmloyeesId?:number;
    detailsAnotherSector?:string;
    parentPhone?:string;
    ageFillApply?:number;
    datailsJobTerapist?:string;
    enotherParentPhone?:string;
    social?:string;
    emotional?:string;
    diagnoses?:string;
    studies?:string;
    ////////////////////////////
    fillEmloyees?:Employee;
    apply?:Apply;
    address?:Address;
    family?:Family;
    matureCharacter?:MatureCharacter;
    sector?:Sector;
    therapeutic?:User;
    user?:User;
    idDetailsAskerNavigation?:DetailsAsker

}

