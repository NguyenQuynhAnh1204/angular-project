import { IDataBaseService, IUser } from "./interface-service";


export class UserMySqlRepository implements IDataBaseService<IUser> {
    public get(pId: string): IUser {
        throw new Error("Not implements");
    }
}

export class UserMongoRepository implements IDataBaseService<IUser> {
    public get(pId: string): IUser {
        throw new Error("Not implements");
    }
}

export class UserRepositoryMock  implements IDataBaseService<IUser> {
    #userList: IUser[] = [
        { id: '1', name: 'A' }, //literal object
        { id: '2', name: 'B' },
    ];

    public get(pId: string) {
        return this.#userList.find((pUser) => pUser.id === pId);
    }
}
