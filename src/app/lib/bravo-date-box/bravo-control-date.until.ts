import * as DateUtil from 'date-fns';
import {
    AddDaysOptions,
    AddMonthsOptions,
    AddYearsOptions,
    DateArg,
    DateValues,
    DifferenceInDaysOptions,
    DifferenceInMonthsOptions,
    DifferenceInYearsOptions,
    EachDayOfIntervalOptions,
    EndOfMonthOptions,
    FormatOptions,
    GetDayOptions,
    GetMonthOptions,
    GetYearOptions,
    IsTodayOptions,
    LastDayOfMonthOptions,
    SetDayOptions,
    SetMonthOptions,
    SetOptions,
    SetYearOptions,
    StartOfMonthOptions,
    SubDaysOptions,
    SubMonthsOptions
} from 'date-fns';


export class BravoMoment {
    // lấy về thời gian hiện tại
    public static now(): BravoMoment {
        return new BravoMoment(new Date());
    }

    public static set(pDate: DateArg<Date>, pValues: DateValues, pOptions?: SetOptions): BravoMoment {
        return new BravoMoment(DateUtil.set(pDate, pValues, pOptions));
    }

    #date!: Date;

    constructor(
        pInput?: Date | string | number | BravoMoment | undefined,
    ) {
        if (pInput == undefined) this.#date = BravoMoment.now().#date;
        else if (pInput instanceof BravoMoment) this.#date = pInput.#date;
        else if (pInput instanceof Date) this.#date = pInput;
    }

    #updateDate(pNewDate: Date): this {
        this.#date = pNewDate;
        return this;
    }

    
    //#region Date Manipulation Methods
    public addDays(pDays: number, pOptions?: AddDaysOptions<Date>): this {
        return this.#updateDate(DateUtil.addDays(this.#date, pDays, pOptions));
    }

    public subDays(pDays: number, pOptions?: SubDaysOptions<Date>): this {
        return this.#updateDate(DateUtil.subDays(this.#date, pDays, pOptions));
    }

    public addMonths(pMonths: number, pOptions?: AddMonthsOptions<Date>): this {
        return this.#updateDate(DateUtil.addMonths(this.#date, pMonths, pOptions));
    }

    public subMonths(pMonths: number, pOptions?: SubMonthsOptions<Date>): this {
        return this.#updateDate(DateUtil.subMonths(this.#date, pMonths, pOptions));
    }

    public addYears(pYears: number, pOptions?: AddYearsOptions<Date>): this {
        return this.#updateDate(DateUtil.addYears(this.#date, pYears, pOptions));
    }

    public subYears(pYears: number): this {
        return this.#updateDate(DateUtil.subYears(this.#date, pYears));
    }

    public startOfWeek(pOptions?: DateUtil.StartOfWeekOptions<Date>): this {

        pOptions ??= {};
        // bỏ BravoAppSettings
        if (pOptions.weekStartsOn == null) {
            pOptions.weekStartsOn = 0; // Sunday default
        }

        return this.#updateDate(
            DateUtil.startOfWeek(this.#date, pOptions)
        );
    }

    public endOfWeek(pOptions?: DateUtil.EndOfWeekOptions<Date>): this {

        pOptions ??= {};
        // bỏ BravoAppSettings
        if (pOptions.weekStartsOn == null) {
            pOptions.weekStartsOn = 0; // Sunday default
        }

        return this.#updateDate(
            DateUtil.endOfWeek(this.#date, pOptions)
        );
    }

    public startOfMonth(pOptions?: StartOfMonthOptions<Date>): this {
        return this.#updateDate(DateUtil.startOfMonth(this.#date, pOptions));
    }

    public endOfMonth(pOptions?: EndOfMonthOptions<Date>): this {
        return this.#updateDate(DateUtil.endOfMonth(this.#date, pOptions));
    }

    public setMonth(pMonth: number, pOptions?: SetMonthOptions<Date>): this {
        return this.#updateDate(DateUtil.setMonth(this.#date, pMonth, pOptions));
    }

    public setDay(pDay: number, pOptions?: SetDayOptions<Date>): this {
        return this.#updateDate(DateUtil.setDay(this.#date, pDay, pOptions));
    }

    public setYear(pYear: number, pOptions?: SetYearOptions<Date>): this {
        return this.#updateDate(DateUtil.setYear(this.#date, pYear, pOptions));
    }

    public static lastDayOfMonth(pDate: BravoMoment | Date | string | number, pOptions?: LastDayOfMonthOptions) {
        const moment = new BravoMoment(pDate);
        return DateUtil.lastDayOfMonth(moment.toDate(), pOptions);
    }
    public lastDayOfMonth(pOptions?: LastDayOfMonthOptions) {
        return this.#updateDate(BravoMoment.lastDayOfMonth(this.#date, pOptions));
    }

    //#endregion Date Manipulation Methods

    //#region Comparison Methods
    public static isValid(pDate: BravoMoment | Date | string | number): boolean {
        const moment = new BravoMoment(pDate);
        return DateUtil.isValid(moment.#date);
    }

    public isSunday() {
        return this.getDay() == 0;
    }

    public isToday(pOptions?: IsTodayOptions): boolean {
        return DateUtil.isToday(this.#date, pOptions);
    }

    public isToMonth(): boolean {
        return this.getMonth() === new BravoMoment().getMonth();
    }

    public isToYear(): boolean {
        return this.getYear() === new BravoMoment().getYear();
    }
    public static isLeapYear(pYear: number): boolean {
        return DateUtil.isLeapYear(pYear);
    }

    public isDate(): boolean {
        return DateUtil.isDate(this.#date);
    }

    public static isDate(pValue: unknown): pValue is Date {
        return DateUtil.isDate(pValue);
    }

    public isBefore(pDate: BravoMoment | Date | string | number): boolean {
        return DateUtil.isBefore(this.#date, new BravoMoment(pDate).toDate());
    }

    public isAfter(pDate: BravoMoment | Date | string | number): boolean {
        return DateUtil.isAfter(this.#date, new BravoMoment(pDate).toDate());
    }

    public isEqual(pDate: BravoMoment | Date | string | number): boolean {
        return DateUtil.isEqual(this.#date, new BravoMoment(pDate).toDate());
    }

    public static isEqual(pDate: BravoMoment | Date | string | number, pDate2: BravoMoment | Date | string | number) {
        return DateUtil.isEqual(new BravoMoment(pDate).toDate(), new BravoMoment(pDate2).toDate());
    }

    public static isDayInMonth(pDay: number, pMonth: number, pYear: number): boolean {
        if (pDay < 1) return false;
        const maxDay = this.lastDayOfMonth(new Date(pYear, pMonth, 1)).getDate();
        return pDay <= maxDay;
    }

    //#endregion Comparison Methods

    //#region Difference Methods

    public differenceInDays(pDate: BravoMoment | Date | string | number, pOptions?: DifferenceInDaysOptions): number {
        return DateUtil.differenceInDays(this.#date, new BravoMoment(pDate).toDate(), pOptions);
    }

    public differenceInMonths(
        pDate: BravoMoment | Date | string | number,
        pOptions?: DifferenceInMonthsOptions,
    ): number {
        return DateUtil.differenceInMonths(this.#date, new BravoMoment(pDate).toDate(), pOptions);
    }

    public differenceInYears(pDate: BravoMoment | Date | string | number, pOptions?: DifferenceInYearsOptions): number {
        return DateUtil.differenceInYears(this.#date, new BravoMoment(pDate).toDate(), pOptions);
    }


    //#endregion Difference Methods

    //#region getters
    public getDay(pOptions?: GetDayOptions): number {
        return DateUtil.getDay(this.#date, pOptions);
    }

    public getMonth(pOptions?: GetMonthOptions): number {
        return DateUtil.getMonth(this.#date, pOptions);
    }

    public getYear(pOptions?: GetYearOptions): number {
        return DateUtil.getYear(this.#date, pOptions);
    }

    public getWeeks(pOptions?: DateUtil.WeekOptions): BravoMoment[][] {

        pOptions ??= {};

        // bỏ BravoAppSettings → dùng default local
        if (pOptions.weekStartsOn == null) {
            pOptions.weekStartsOn = 0; // Sunday (default)
        }

        const start = this.clone().startOfMonth().startOfWeek(pOptions);

        const end = this.clone().endOfMonth().endOfWeek(pOptions);

        const days = BravoMoment.eachDayOfInterval(start, end);

        return Array.from(
            {
                length: DateUtil.getWeeksInMonth(this.#date, pOptions),
            },
            (_, pIndex) =>
                days
                    .slice(pIndex * 7, (pIndex + 1) * 7)
                    .map(pDay => new BravoMoment(pDay)),
        );
    }


    //immutable
    public getMonths(pattern = 'MMM',pNumberOfRow: number): number[][] {
        const numberMonthInYear = 12;
        const itemPerRow = Math.floor(numberMonthInYear / pNumberOfRow);

        const months = Array.from(
            { length: numberMonthInYear },
            (_, index) => index + 1
        );

        return Array.from({ length: pNumberOfRow }, (_, rowIndex) =>
            months.slice(
            rowIndex * itemPerRow,
            (rowIndex + 1) * itemPerRow
            )
        );
    }

    //immutable
    public getYears(pNumberOfRow: number, pItemPerRow: number): number[][] {
        const currentYear = this.getYear(); //current year
        const mount = pNumberOfRow * pItemPerRow;
        const half = Math.floor(mount / 2);
        const startYear = currentYear - half; //start year
        // create array BravoMoment from startYear, stay day,month and hours
        const years = Array.from({ length: mount }, (_, pIndex) => startYear + pIndex);

        return Array.from({ length: Math.ceil(mount / pNumberOfRow) }, (_, i) =>
            years.slice(i * pItemPerRow, (i + 1) * pItemPerRow),
        );
    }
    
    //immutable
    public getDays(pattern = 'EEE', pOptions?: FormatOptions): string[] {
        if (!pattern) pattern = 'EEE';
        pOptions ??= {};
        // thay BravoAppSettings bằng default local
        if (pOptions.weekStartsOn == null) {
            pOptions.weekStartsOn = 0; // default Sunday
        }
        const days = Array.from({ length: 7 }, (_, pIndex) =>
            DateUtil.format(
                new Date(2000, 0, pIndex + 3),
                pattern,
                pOptions,
            ),
        );
        if (pOptions.weekStartsOn === 0) {
            const sunday = days.pop();
            if (sunday) days.unshift(sunday);
        }
        return days;
    }

    public getTime(): number {
        return this.#date.getTime();
    }

    public getFullYear(): number {
        return this.#date.getFullYear();
    }

    public getDate(): number {
        return this.#date.getDate();
    }

    public toDate(): Date {
        return this.#date;
    }
    //#endregion getters


    //#region Utility Methods

    public static eachDayOfInterval(
        pStartDate: BravoMoment | Date | string | number,
        pEndDate: BravoMoment | Date | string | number,
        pOptions?: EachDayOfIntervalOptions,
    ): Date[] {
        return DateUtil.eachDayOfInterval(
            { start: new BravoMoment(pStartDate).#date, end: new BravoMoment(pEndDate).toDate() },
            pOptions,
        );
    }

    public clone(): BravoMoment {
        return new BravoMoment(this.#date ? new Date(this.#date) : undefined);
    }
}
