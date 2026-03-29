import { AfterViewInit, Component, ElementRef, inject, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subject, takeUntil } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { DATE_TIME, IDate } from '../bravo-control-date.type';

@Component({
    standalone: true,
    selector: 'date-picker',
    templateUrl: './bravo-date-picker.component.html',
    styleUrls: ["./bravo-date-picker.component.scss"],
    imports: [CommonModule]
})

export class DatePickerComponent implements AfterViewInit, OnDestroy{
    private _overlay = inject(OverlayRef);
    private _dateTimePro = inject(DATE_TIME);
    private destroy$ = new Subject<void>();

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

    private _selectTime: IDate = {
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
    }

    // tất cả các ngày trong tháng
    private _dateOfCurrentMonth!: IDate[];
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
        if(this._dateTimePro) {
            this.selectTime = this._dateTimePro
        }
        this.getAllDayOfMonth();
        this.getFirstOfNextMonth()
        this.getLastOfPrevMonth()
    }

    public ngAfterViewInit() {
        this.dateBoxRef.forEach((boxItem) => {
            fromEvent(boxItem.nativeElement, "mouseenter")
                .pipe(
                    debounceTime(500),
                    distinctUntilChanged(),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => {
                    // console.log(boxItem.nativeElement.textContent)
                })
        })
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete()
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
        this.dateOfCurrentMonth = Array.from({ length: daysInMonth }, (_, i): IDate => {
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
    public onSelectDate(pDate: IDate) {
        this.selectTime = pDate;
    }
}