import { CauseReferral } from "./CauseReferral";
import { User } from "./User";

export class DetailsAsker {
    userId?: number;
    affinity?: string;
    referredBy?: string;
    idResone?:number;
    id?:number;
    
    idResoneNavigation?:CauseReferral;
    user?:User;
}
