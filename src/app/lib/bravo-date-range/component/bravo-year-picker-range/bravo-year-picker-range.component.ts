import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateRangeService } from '../../bravo-date-range.service';

@Component({
    selector: 'br-year-picker-range',
    templateUrl: './bravo-year-picker-range.component.html',
    styleUrls: ["./bravo-year-picker-range.component.scss"]
})

export class BravoYearPickerRangeComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);
    
    private _moment!: BravoMoment;
    public get moment() {
        return this._moment;
    }
    public set moment(pMoment) {
        this._moment = pMoment;
    }

    public years!: BravoMoment[][];

    public selectedYear!: number;

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
                this.years = pMoment.getYears(5, 5);
            })
        this.selectedYear = this.moment.getFullYear();
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public selectYear(pDate: BravoMoment) {
        this._service.selectYear(this.time, pDate);
    }
}