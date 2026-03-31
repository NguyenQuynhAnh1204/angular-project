import { EventEmitter, InjectionToken } from "@angular/core";

export interface IDateTime {
    day: number;
    date: number;
    month: number;
    year: number
}

export const SELECT_TIME = new InjectionToken<string>("");