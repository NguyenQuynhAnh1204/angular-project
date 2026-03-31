import { InjectionToken } from "@angular/core";

export const DATE_TIME = new InjectionToken<IDateTime>('date time');

export const DATE_MONTH = new InjectionToken<number>("date month");
export const DATE_YEAR = new InjectionToken<number>("date year");
export interface IDateTime {
    day: number;
    date: number;
    month: number;
    year: number;
}

export interface IMonthTime {
    month: number;
    year: number;
}
