import { TConstructor } from "./interface-service";



export class ServiceCache {
    #cache!: Map<any, any>;
    public get cache() {
        if(!this.#cache) {
            this.#cache = new Map<any, any>();
        }
        return this.#cache;
    }

    public getService(pProvider: any, pUseClass: TConstructor) {
        const serviceClass = pUseClass ?? pProvider;
        if(!serviceClass) {
            throw new Error("Please ensure provider class type");
        }
        
        if(!this.cache.has(serviceClass)) {
            const service = this._createService(serviceClass);
            if(!service) {
                throw new Error(`This ${service} is not found`);
            }
            this.cache.set(pProvider, service)
        }
        return this.cache.get(pProvider);
    }

    private _createService(pService: TConstructor) {
        return createInstance(pService);
    }
}


function createInstance<T>(pService: any): T | null {
    let instance: T | null = null;
    try {
        if(typeof pService === "function") {
            instance = new pService();
        }
    }
    catch(e) {
        instance = null
    }
    return instance;
}