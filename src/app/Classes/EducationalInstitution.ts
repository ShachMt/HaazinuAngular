import { Address } from "./Address";
import { InstitutionsCategory } from "./InstitutionsCategory";
import { Sector } from "./Sector";
import { StylesInstitution } from "./StylesInstitution";

export class EducationalInstitution {
    id?: number;
    idCategory?:number;
    addressId?: number;
    institutionName?: string;
    enotherName?:string;
    sectorId?:number;
    level?:string;
    educationKind?:string;
    IsExterny?:boolean;
    idStyle?:number;
    numStudent?:number;
    
    address?:Address;
    idCategoryNavigation?:InstitutionsCategory;
    idStyleNavigation?:StylesInstitution
     sector?:Sector;
}

