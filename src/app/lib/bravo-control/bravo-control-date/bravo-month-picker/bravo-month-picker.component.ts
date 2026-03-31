import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subject, takeUntil } from 'rxjs';
import { IMonthTime } from '../bravo-control-date.type';

const MONTH = [1,2,3,4,5,6,7,8,9,10,11,12]

@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent implements AfterViewInit, OnDestroy {
    private destroy$ = new Subject<void>();

    public fullMonth = MONTH;

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

    private _selectedTime: IMonthTime = {
        month: -1,
        year: -1,
    }
    public get selectedTime() {
        return this._selectedTime;
    }
    public set selectedTime(pTime) {
        this._selectedTime = pTime;
    }

    @ViewChildren('monthItemRef')
    public monthItemRef!: QueryList<ElementRef>;

    ngAfterViewInit() {
        this.monthItemRef.forEach((month) => {
            fromEvent(month.nativeElement, "mouseenter")
                .pipe(
                    debounceTime(500),
                    distinctUntilChanged(),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => {
                    // console.log(`${month.nativeElement.textContent}/${this.selectYear}`)
                })
        })
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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
}