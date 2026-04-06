import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { BravoDateRangeService } from '../../bravo-date-range.service';

@Component({
    selector: 'br-date-picker-range',
    templateUrl: './bravo-date-picker-range.component.html',
    styleUrls: ["./bravo-date-picker-range.component.scss"]
})

export class BravoDatePickerRangeComponent implements AfterViewInit, OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);  
    
    private _moment!: BravoMoment;
    public get moment() {
        return this._moment;
    }
    public set moment(pMoment) {
        this._moment = pMoment;
    }

    public dates: BravoMoment[][] = [];
    public days: string[] = [];
 
    private _time!: 'start' | 'end';
    @Input('time')
    public get time() {
        return this._time;
    }
    public set time(pTime) {
        this._time = pTime;
    }

    private _dateItem!: QueryList<ElementRef>
    @ViewChildren('dateItem')
    public get dateItem() {
        return this._dateItem;
    }
    public set dateItem(pDateItem) {
        this._dateItem = pDateItem;
    }

    public ngOnInit() {
        if(this.time == 'start') {
            this._service.momentStartChange$
                .pipe(takeUntil(this._destroy$))
                .subscribe((pMoment) => {
                    this.moment = pMoment;
                    this.dates = pMoment.getWeeks();
                })
        }
        if(this.time == "end") {
            this._service.momentEndChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pMoment) => {
                this.moment = pMoment;
                this.dates = pMoment.getWeeks();
            })
        }
        this.days = this.moment.getDays();
    }

    public ngAfterViewInit() {
        this.dateItem.forEach((pEl) => {
            fromEvent(pEl.nativeElement, 'mouseover')
            .subscribe(() => {
                console.log('vo')
                pEl.nativeElement.classList.add("is-select");
            })
            fromEvent(pEl.nativeElement, 'mouseleave')
            .subscribe(() => {
                pEl.nativeElement.classList.remove("is-select");
            })
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public selectDate(pDate: BravoMoment) {
        if(!this._service.selectedStartDate) {
            this._service.selectedStartDate = pDate;
            return;
        } 
        if(!this._service.selectedEndDate) {
            this._service.selectedEndDate = pDate;
            return;
        }
        
    }

    public isSelected(pDate: BravoMoment) {
        return (this._service.selectedStartDate?.getDate() == pDate.getDate() && 
        this._service.selectedStartDate?.getMonth() == pDate.getMonth() && 
        this._service.selectedStartDate?.getFullYear() == pDate.getFullYear()) ||
        (this._service.selectedEndDate?.getDate() == pDate.getDate() && 
        this._service.selectedEndDate?.getMonth() == pDate.getMonth() && 
        this._service.selectedEndDate?.getFullYear() == pDate.getFullYear());
    }

    // trả về date lớn hơn 
    private _compareDate(pDate: BravoMoment, pOtherDate: BravoMoment) {
        return pDate.getTime() - pOtherDate.getTime();
    }
}