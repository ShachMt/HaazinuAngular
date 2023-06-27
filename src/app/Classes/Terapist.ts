import { User } from "./User";

export class Terapist {
    id?: number;
    idUser?:number;
    city?: string;
    job?:string;
    remarks?:string;
    permissionContact?:boolean;
    isStillTerapist?:boolean;
    idUserNavigation?:User
}