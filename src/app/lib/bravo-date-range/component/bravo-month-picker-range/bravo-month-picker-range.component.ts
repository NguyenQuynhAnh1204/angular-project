import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoDateRangeService } from '../../bravo-date-range.service';
import { Subject, takeUntil } from 'rxjs';
import { BravoMoment } from '@bravo-infra/core/utils/dates';

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
        if(this.time == 'start') {
            this._service.momentStartChange$
                .pipe(takeUntil(this._destroy$))
                .subscribe((pMoment) => {
                    this.moment = pMoment;
                    this.months = pMoment.getMonths('MMM', 3);
                })
        }
        if(this.time == 'end') {
            this._service.momentEndChange$
                .pipe(takeUntil(this._destroy$))
                .subscribe((pMoment) => {
                    this.moment = pMoment;
                    this.months = pMoment.getMonths('MMM', 3);
                })
        }
        this.selectedMonth = this.moment.getMonth();
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public selectMonth(pSelect: BravoMoment) {
        this.selectedMonth = pSelect.getMonth();
        if(this.time == 'start') {
            this._service.momentStart = BravoMoment.set(this.moment.toDate(), {
                month: pSelect.getMonth(),
            })
            this._service.momentEnd = BravoMoment.set(this.moment.toDate(), {
                month: pSelect.getMonth() + 1
            })
        } else if(this.time == 'end') {
            this._service.momentStart = BravoMoment.set(this.moment.toDate(), {
                month: pSelect.getMonth() - 1,
            })
            this._service.momentEnd = BravoMoment.set(this.moment.toDate(), {
                month: pSelect.getMonth()
            })
        }
        this._service.switchView(this.time, 1);
    }
}