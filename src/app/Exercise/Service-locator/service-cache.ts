
import { ServiceInitialContext } from "./service-initial-context";

type Constructor<T = any> = new (...args: any[]) => T;

export class ServiceCache {
    #cache!: Map<Constructor, any>;
    public get cache() {
        if(!this.#cache) {
            this.#cache = new Map<Constructor, any>();
        }
        return this.#cache;
    }

    public getService(pService: Constructor, pRepo: Constructor) {
        if(!this.cache.has(pService)) {
            const context = new ServiceInitialContext();
            const service = context.createService(pService, pRepo);
            if(!service) {
                throw new Error(`this service ${service} is not found`);
            }
            this.cache.set(pService, service);
        }
        return this.cache.get(pService);
    }
}