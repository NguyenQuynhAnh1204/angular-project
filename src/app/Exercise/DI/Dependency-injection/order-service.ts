import { IDataBaseService, IGeneralService, IOrder } from "./interface-service";



export class OrderService implements IGeneralService {
    public repository!: IDataBaseService<IOrder>;
    constructor(pRepo: IDataBaseService<IOrder>) {
        this.repository = pRepo;
    }
}   