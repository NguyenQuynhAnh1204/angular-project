import { InjectionToken } from "@angular/core";

export interface IDate {
    day: number;
    date: number;
    month: number;
    year: number;
}

export const DATE_TIME = new InjectionToken<IDate>('date time');