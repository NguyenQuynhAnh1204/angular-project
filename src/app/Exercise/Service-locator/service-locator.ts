
import { TConstructor } from "../Dependency-injection/interface-service";
import { ServiceCache } from "./service-cache";
export class ServiceLocator {
    static #locator: ServiceLocator;
    #cache = new ServiceCache();

    public static getLocator() {
        if(!this.#locator) {
            this.#locator = new ServiceLocator();
        }
        return this.#locator;
    }

    public getService(pProvider: any, pUseClass?: TConstructor) {
        return this.#cache.getService(pProvider, pUseClass);
    }
}