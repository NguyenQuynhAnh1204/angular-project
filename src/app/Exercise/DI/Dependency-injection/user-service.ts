import { Inject, Injectable, InjectionToken } from "@angular/core";
import { IDataBaseService, IGeneralService, IUser } from "./interface-service";

const USER_REPO = new InjectionToken<IDataBaseService<IUser>>('USER_REPO');

@Injectable({
    providedIn: "root"
})
export class UserService implements IGeneralService {
    public repository!: IDataBaseService<IUser>;
    constructor(@Inject(USER_REPO) pRepo: IDataBaseService<IUser>) {
        this.repository = pRepo;
    }

    public getUserId(pId: string) {
        return this.repository.get(pId);
    }

    public getAllUser() {
        return this.repository.getAll();
    }
    
}