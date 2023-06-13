import { EducationalInstitution } from "./EducationalInstitution";
import { User } from "./User";

export class EducationalInstitutionsApplicant {
    userId?: number;
    institutionId?:number
    status?:string;
    details?: string;
    id?: number;
        
     user?:User;
    institution?:EducationalInstitution
}