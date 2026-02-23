import { IDataBaseService } from "../Dependency-injection/interface-service";
import { OrderRepositoryMock } from "../Dependency-injection/order-repo";
import { OrderService } from "../Dependency-injection/order-service";
import { UserRepositoryMock } from "../Dependency-injection/user-repo";
import { UserService } from "../Dependency-injection/user-service";

type Constructor<T = any> = new (...args: any[]) => T;

export class ServiceInitialContext {
    // #userMock = new UserRepositoryMock();
    // #orderMock = new OrderRepositoryMock(); 
    public createService(pService: Constructor, pRepo: Constructor) {
        if(pService == UserService) {
            return new pService(new pRepo())
        }
        if(pService == OrderService) {
            return new pService(new pRepo())
        }
        return null;
    }
}