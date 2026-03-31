import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, QueryList, ViewChildren } from '@angular/core';
import { IDateTime, SELECT_TIME } from '../bravo-control-date.type';

@Component({
    selector: 'date-picker',
    templateUrl: './bravo-date-picker.component.html',
    styleUrls: ["./bravo-date-picker.component.scss"],
    imports: [CommonModule]
})

export class BravoDatePickerComponent {
    private _overlay = inject(OverlayRef);
    private _date = inject(SELECT_TIME);
    public select$ = new EventEmitter();

    private _dateBoxRef !: QueryList<ElementRef>;
    @ViewChildren('dateItemBox')
    public get dateBoxRef() {
        return this._dateBoxRef;
    }
    public set dateBoxRef(pRef) {
        this._dateBoxRef = pRef;
    }
    // time hiện tại
    private _currentTime = new Date()
    public get currentTime() {
        return this._currentTime;
    }
    public get currentDay() {
        return this.currentTime.getDay();
    }
    public get currentDate() {
        return this.currentTime.getDate();
    }
    public get currentMonth() {
        return this.currentTime.getMonth()+1;
    }
    public get currentYear() {
        return this.currentTime.getFullYear();
    }

    //năm
    private _selectedYear = this.currentYear;
    public get selectedYear() {
        return this._selectedYear;
    }
    public set selectedYear(pYear) {
        this._selectedYear = pYear;
    }
    // tháng
    private _selectedMonth = this.currentMonth;
    public get selectedMonth() {
        return this._selectedMonth;
    }
    public set selectedMonth(pMonth) {
        this._selectedMonth = pMonth;
        this.getAllDayOfMonth();
    }
    // ngày
    private _selectedDate = this.currentDate;
    public get selectedDate() {
        return this._selectedDate;
    }
    public set selectedDate(pDate) {
        this._selectedDate = pDate;
    }
    // thứ
    private _selectedDay = this.currentDay;
    public get selectedDay() {
        return this._selectedDay;
    }
    public set selectedDay(pDay) {
        this._selectedDay = pDay;
    }

    private _selectTime: IDateTime = {
        day: -1,
        date: -1,
        month: -1,
        year: -1
    };
    public get selectTime() {
        return this._selectTime;
    }
    public set selectTime(pSelectTime) {
        this._selectTime = pSelectTime;
        if(pSelectTime) {
            this.selectedDate = pSelectTime.date;
            this.selectedDay = pSelectTime.day;
            this.selectedMonth = pSelectTime.month;
            this.selectedYear = pSelectTime.year;
        }
        this.select$.emit(this.convertToString(this.selectTime));
        this._overlay.detach();
    }

    // tất cả các ngày trong tháng
    private _dateOfCurrentMonth!: IDateTime[];
    public get dateOfCurrentMonth() {
        return this._dateOfCurrentMonth;
    }
    public set dateOfCurrentMonth(pDays) {
        this._dateOfCurrentMonth = pDays;
    }

    // các ngày cuối cùng của tháng trước trong cùng một tuần
    private _lastOfPrevMonth!: number[];
    public get lastOfPrevMonth() {
        return this._lastOfPrevMonth;
    }
    public set lastOfPrevMonth(pLastOfMonth) {
        this._lastOfPrevMonth = pLastOfMonth;
    }

    // các ngày đầu tiên của tháng sau trong cùng một tuần
    private _firstOfNextMonth!: number[];
    public get firstOfNextMonth() {
        return this._firstOfNextMonth;
    }
    public set firstOfNextMonth(pFirstOfMonth) {
        this._firstOfNextMonth = pFirstOfMonth;
    }

    public constructor() {
        if(this._date) {
            this.selectTime = this.parseFlexibleDate(this._date);
        }
        this.getAllDayOfMonth();
        this.getFirstOfNextMonth()
        this.getLastOfPrevMonth()
    }

    public previousMonth() {
        this.selectedMonth = this.selectedMonth - 1;
        if(this.selectedMonth < 1) {
            this.selectedYear = this.selectedYear - 1;
            this.selectedMonth = 12;
        }
    }

    public nextMonth() {
        this.selectedMonth =  this.selectedMonth + 1;
        if(this.selectedMonth > 12) {
            this.selectedMonth = 1;
            this.selectedYear = this.selectedYear + 1;
        }
    }

    public getLastOfPrevMonth() {
        let dates: number[] = []
        // lấy ngày cuối cùng của tháng trước
        const lastMonth = new Date(this.selectedYear, this.selectedMonth-1, 0);
        for(let i = 0; i <= lastMonth.getDay(); i++) {
            const dateItem = lastMonth.getDate() - lastMonth.getDay() + i;
            dates.push(dateItem);
        }
        return dates.length < 7 ? dates : [];
    }
    
    public getFirstOfNextMonth() {
        let dates: number[] = []
        // lấy ngày đầu tiên của tháng sau
        const nextMonth = new Date(this.selectedYear, this.selectedMonth, 1);
        for(let i = nextMonth.getDay(); i < 7; i++) {
            const dateItem = nextMonth.getDate() - nextMonth.getDay() + i;
            dates.push(dateItem);
        }
        return dates.length < 7 ? dates : [];
    }

    // hàm trả về các ngày trong tháng
    public getAllDayOfMonth() {
        const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
        this.dateOfCurrentMonth = Array.from({ length: daysInMonth }, (_, i): IDateTime => {
            const dateValue = i + 1;
            const d = new Date(this.selectedYear, this.selectedMonth - 1, dateValue);

            return {
                day: d.getDay(),
                date: dateValue,
                month: this.selectedMonth,
                year: this.selectedYear
            };
        });
        this.lastOfPrevMonth = this.getLastOfPrevMonth();                              
        this.firstOfNextMonth = this.getFirstOfNextMonth();
    }

    // hàm chọn Thời gian
    public onSelectDate(pDate: IDateTime) {
        this.selectTime = pDate;
    }

    public convertToString(pDate: IDateTime): string {
        if(!pDate) return '';
        const dateStr = pDate.date.toString().padStart(2, '0');
        const monthStr = pDate.month.toString().padStart(2, '0');

        return `${dateStr}/${monthStr}/${pDate.year}`
    }

    public parseFlexibleDate(pDateStr: string): IDateTime {
        if (!pDateStr) return {
            day: -1,
            date: -1,
            month: -1,
            year: -1
        };

        const parts = pDateStr.split('/');
        const year = parts.length >= 1 ? parseInt(parts[parts.length - 1], 10) : -1;
        const month = parts.length >= 2 ? parseInt(parts[parts.length - 2], 10) : -1;
        const date = parts.length >= 3 ? parseInt(parts[parts.length - 3], 10) : -1;

        return {
            day: -1,
            date: date,
            month: month,
            year: year
        };
    }
}