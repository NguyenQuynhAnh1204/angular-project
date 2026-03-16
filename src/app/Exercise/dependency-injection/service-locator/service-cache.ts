
import { TConstructor } from "../Dependency-injection/interface-service";



export class ServiceCache {
    #cache!: Map<any, any>;
    public get cache() {
        if(!this.#cache) {
            this.#cache = new Map<any, any>();
        }
        return this.#cache;
    }

    public getService(pProvider: any, pUseClass?: TConstructor) {
        const serviceClass = pUseClass ?? pProvider;
        if (!serviceClass) throw new Error('Please ensure provider class type!!!');

        if (!this.cache.has(pProvider)) {
        const service = this.#createService(pProvider);
        if (!service) throw new Error(`this service ${service} is not found`);
        this.cache.set(pProvider, service);
        }
        return this.cache.get(pProvider);
    }

    #createService(pUseClass: TConstructor) {
        return createInstance(pUseClass);
    }
}


function createInstance<T>(param: any): T | null {
  let instance: T | null = null;
  try {
    if (typeof param === 'function') instance = new param();
  } catch (error) {
    instance = null;
  }
  return instance;
}
