import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateRangeService } from '../../bravo-date-range.service';

@Component({
    selector: 'br-month-picker-range',
    templateUrl: './bravo-month-picker-range.component.html',
    styleUrls: ["./bravo-month-picker-range.component.scss"]
})

export class BravoMonthPickerRangeComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);
    
    private _moment!: BravoMoment;
    public get moment() {
        return this._moment;
    }
    public set moment(pMoment) {
        this._moment = pMoment;
    }

    public selectedMonth!: number;

    public months: BravoMoment[][] = []

    private _time!: 'start' | 'end';
    @Input('time')
    public get time() {
        return this._time;
    }
    public set time(pTime) {
        this._time = pTime;
    }

    public ngOnInit() {
        const momentChange$ = this.time == 'start' ? this._service.momentStartChange$ : this._service.momentEndChange$;
        momentChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pMoment) => {
                this.moment = pMoment;
                this.months = pMoment.getMonths('MMM', 3);
            })
        this.selectedMonth = this.moment.getMonth();
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public selectMonth(pDate: BravoMoment) {
        this._service.selectMonth(this.time, pDate);
    }
}