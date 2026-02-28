import { Injectable } from "@angular/core";
import { IDataBaseService, IUser } from "./interface-service";

@Injectable()
export class UserMySqlRepository implements IDataBaseService<IUser> {
    public get(pId: string): IUser {
        throw new Error("Not implements");
    }

    public getAll(): undefined {
        throw new Error("Not implements");
    }
}
@Injectable()
export class UserMongoRepository implements IDataBaseService<IUser> {
    public get(pId: string): IUser {
        throw new Error("Not implements");
    }

    public getAll(): undefined {
        throw new Error("Not implements");
    }
}
@Injectable()
export class UserRepositoryMock  implements IDataBaseService<IUser> {
    #userList: IUser[] = [
        { id: '1', name: 'Nguyễn văn A', age: 22 }, //literal object
        { id: '2', name: 'Nguyễn Văn B', age: 10 },
    ];

    public get(pId: string) {
        return this.#userList.find((pUser) => pUser.id === pId);
    }

    public getAll() {
        return this.#userList;
    }
}
