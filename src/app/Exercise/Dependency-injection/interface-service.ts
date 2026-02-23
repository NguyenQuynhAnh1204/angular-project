
/**
 * @description  repository: IDataBaseService
 */
export interface IGeneralService {
    repository: IDataBaseService;
    
}


/**
 * @description type<T = any>, get(pId:string) => T
 */
export interface IDataBaseService<T=any> {
    get: (pId: string) => T | undefined;
}

/**
 * @description id: string, name?: string
 */
export interface IUser {
    id: string;
    name?: string;
}

/**
 * @description id: string, name?: string
 */
export interface IOrder {
    id: string;
    order?: string;
}



