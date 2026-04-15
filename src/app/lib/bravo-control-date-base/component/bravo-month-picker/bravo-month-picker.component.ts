import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { RangePartType } from '../../bravo-control-date.type';
import { BravoDateService } from '../../bravo-control-date.service';
@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get panels() {
        return this._service.panels;
    }
    public get date() {
        return this._service.panels[this.partType].date;
    }
    public get isRange() {
        return this,this._service.isRange;
    }
    public get mode() {
        return this._service.mode;
    }

    @Input('partType')
    public partType!: RangePartType;

    public selectedMonth!: number;

    public months: BravoMoment[][] = [];

    public ngOnInit() {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.months = pVal[this.partType].date.getMonths('MMM',3);
            this.selectedMonth = pVal[this.partType].date.getMonth() + 1;
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectMonth(pDate: BravoMoment) {
        this.selectedMonth = pDate.getMonth() + 1;
        const panels = this.panels;
        // single
        if (!this.isRange) {
            this._service.panels = {
                ...panels,
                [this.partType]: {
                date: pDate,
                mode: this.mode
                }
            };
            if (this.mode == 'month'){
                this._service.value = pDate;
                this._service.hideDatePicker();
            }
            return;
        }
        // range
        let startDate = panels.start.date;
        let startMode = panels.start.mode;
        let endDate = panels.end.date;
        let endMode = panels.end.mode;
        if (this.partType === 'start') {
            startDate = pDate;
            startMode = this.mode;
            endDate = this.mode == 'date' ?  pDate.clone().addMonths(1) : pDate.clone().addYears(1);
        }
        if (this.partType === 'end') {
            endDate = pDate;
            endMode = this.mode;
            startDate = this.mode == 'date' ? pDate.clone().subMonths(1) : pDate.clone().subYears(1                                                                                     );
        }
        this._service.panels = {
            start: {
                date: startDate,
                mode: startMode
            },
            end: {
                date: endDate,
                mode: endMode
            }
        };
    }
}