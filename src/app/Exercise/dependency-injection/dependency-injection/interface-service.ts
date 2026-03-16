
/**
 * @description  repository: IDataBaseService
 */
export interface IGeneralService {
    repository: IDataBaseService;
    getAllUser: () => IUser[] | undefined;
}   


/**
 * @description type<T = any>, get(pId:string) => T
 */
export interface IDataBaseService<T=any> {
    get: (pId: string) => T | undefined;
    getAll: () => T[] | undefined;
}

/**
 * @description id: string, name?: string
 */
export interface IUser {
    id: string;
    name?: string;
    age?: number;
}

/**
 * @description id: string, name?: string
 */
export interface IOrder {
    id: string;
    order?: string;
}


export type TConstructor<T = any> = new (...args: any[]) => T;
