import { IDataBaseService, IGeneralService, IUser } from "./interface-service";


export class UserService implements IGeneralService {
    public repository!: IDataBaseService<IUser>;
    constructor(pRepo: IDataBaseService<IUser>) {
        this.repository = pRepo;
    }
    
}