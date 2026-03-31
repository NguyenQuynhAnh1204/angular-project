import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, inject } from '@angular/core';
import { IDateTime, SELECT_TIME } from '../../bravo-control-date.type';

@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent {
    private _overlay = inject(OverlayRef);
    private _date = inject(SELECT_TIME);
    private select$ = new EventEmitter<string>();
    
    public fullMonths = [1,2,3,4,5,6,7,8,9,10,11,12];
    
    private _current = new Date()
    public get currentYear() {
        return this._current.getFullYear()
    }
    public get currentMonth() {
        return this._current.getMonth() + 1;
    }


    private _selectMonth = this.currentMonth;
    public get selectMonth() {
        return this._selectMonth;
    }
    public set selectMonth(pVal) {
        this._selectMonth = pVal;
    }
    
    private _selectYear = this.currentYear;
    public get selectYear() {
        return this._selectYear;
    }
    public set selectYear(pVal) {
        this._selectYear = pVal;
    }

    private _selectedTime: Pick<IDateTime, 'month'| 'year'> = {
        month: -1,
        year: -1,
    }
    public get selectedTime() {
        return this._selectedTime;
    }
    public set selectedTime(pTime) {
        this._selectedTime = pTime;
        if(pTime) {
            this.selectMonth = pTime.month;
            this.selectYear = pTime.year;
        }
        this.select$.emit(this.convertToString(this.selectedTime.month, this.selectedTime.year));
        this._overlay.detach();
    }

    constructor() {
        if(this._date) {
            this.selectedTime = this.parseFlexibleDate(this._date)!;
        }
    }

    public previousYear() {
        this.selectYear = this.selectYear - 1;
    }

    public nextYear() {
        this.selectYear = this.selectYear + 1;
    }

    public onSelectMonth(pMonth: number) {
        this.selectMonth = pMonth;
        this.selectedTime = {
            year: this.selectYear,
            month: this.selectMonth,
        }
    }

    public onChangeYear(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value = Number(input.value);
        this.selectYear = value;
    }

    public convertToString(pMonth: number, pYear: number): string {
        if(!pMonth) return "";
        const monthStr = pMonth.toString().padStart(2, '0');
        return `${monthStr}/${pYear}`
    }
    
    public parseFlexibleDate(pDateStr: string): Pick<IDateTime, 'month'| 'year'> {
        if (!pDateStr) return {
            month: -1,
            year: -1,
        };

        const parts = pDateStr.split('/');
        
        // Chúng ta sẽ lấy các giá trị từ phải qua trái (năm luôn ở cuối)
        const year = parts.length >= 1 ? parseInt(parts[parts.length - 1], 10) : -1;
        const month = parts.length >= 2 ? parseInt(parts[parts.length - 2], 10) : -1;

        return {
            month: month,
            year: year
        };
    }
}