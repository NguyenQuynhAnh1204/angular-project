import {
    Component, ElementRef, inject,
    Input, OnDestroy, OnInit, QueryList, ViewChildren
} from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateRangeService } from '../../bravo-date-range.service';

@Component({
    selector: 'br-date-picker-range',
    templateUrl: './bravo-date-picker-range.component.html',
    styleUrls: ["./bravo-date-picker-range.component.scss"]
})

export class BravoDatePickerRangeComponent implements OnInit, OnDestroy {
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

    public hoverDates: BravoMoment[] = [];
 
    private _time!: 'start' | 'end';
    @Input('time')
    public get time() {
        return this._time;
    }
    public set time(pTime) {
        this._time = pTime;
    }

    @ViewChildren('dateItem')
    public dateItem!: QueryList<ElementRef>

    public ngOnInit() {
        const momentChange$ = this.time == 'start' ? this._service.momentStartChange$ : this._service.momentEndChange$;
        momentChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pMoment) => {
                this.moment = pMoment;
                this.dates = pMoment.getWeeks();
            })
        this.days = this.moment.getDays();
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public selectDate(pDate: BravoMoment) { 
        this._service.selectDate(pDate);
    }

    public handleOnHover(pDate: BravoMoment) {
        if(!this._service.selectedStartDate && !this._service.selectedEndDate) return;
        this._service.hoverDate = pDate;
    }

    public handleOnLeave() {
        this._service.hoverDate = null;
    }

    public isStartDate(pDate: BravoMoment) {
        return this._service.selectedStartDate?.isSameDay(pDate)
    }

    public isEndDate(pDate: BravoMoment) {
        return this._service.selectedEndDate?.isSameDay(pDate)
    }

    public isRange(pDate: BravoMoment) {
        const start = this._service.selectedStartDate;
        const end = this._service.selectedEndDate;
        if(!start || !end) return false;
        const startTime = start.getTime();
        const endTime = end.getTime();
        const dateTime = pDate.getTime();
        return dateTime > startTime && dateTime < endTime;
    }

    public isHoverDate(pDate: BravoMoment): boolean {
        const { selectedStartDate, selectedEndDate, hoverDate } = this._service;
        if (!hoverDate) return false;
        const anchor = selectedStartDate ?? selectedEndDate;
        if (!anchor) return false;
        const dateTime = pDate.getTime();
        const anchorTime = anchor.getTime();
        const hoverTime = hoverDate.getTime();
        return dateTime >= Math.min(anchorTime, hoverTime) && dateTime <= Math.max(anchorTime, hoverTime);
    }
}