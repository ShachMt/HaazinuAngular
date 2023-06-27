import { Apply } from "./Apply";
import { User } from "./User";

export class MatureCharacter {
    idApplicant?: number;
    idMature?:number;
    framwork?:string;
    // permissionContact?: boolean;
    id?: number;
    remarks?:string;
    nameCity?:string;

    idApplicantNavigation?:Apply;
    idMatureNavigation?:User;
}




