import { IDataBaseService, IOrder } from "./interface-service";

export class OrderMySqlRepository implements IDataBaseService<IOrder> {
    public get(pId: string): IOrder {
        throw new Error("Not implements");
    }
}

export class OrderMOngoRepository implements IDataBaseService<IOrder>  {
    public get(pId: string): IOrder {
        throw new Error("Not implements");
    }
}


export class OrderRepositoryMock  implements IDataBaseService<IOrder> {
    #orderList: IOrder[] = [
        { id: '1', order: 'A' },
        { id: '2', order: 'B' },
    ];

    public get(pId: string) {
        return this.#orderList.find((pOrder) => pOrder.id === pId);
    }
}