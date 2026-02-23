
import { ServiceCache } from "./service-cache";

type Constructor<T = any> = new (...args: any[]) => T;
 
export class ServiceLocator {
    static #locator: ServiceLocator;
    #cache = new ServiceCache();

    public static getLocator() {
        if(!this.#locator) {
            this.#locator = new ServiceLocator();
        }
        return this.#locator;
    }

    public getService(pService: Constructor, pRepo: Constructor) {
        return this.#cache.getService(pService, pRepo);
    }
}