import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { RangePartType } from '../../bravo-control-date.type';
import { isRangeValue, offsetDate } from '../../bravo-control-date.until';
import { BravoDateAbstractComponent } from '../bravo-date-abstract';
@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent extends BravoDateAbstractComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    public get date() {
        return this._service.panels[this.partType].date;
    }

    @Input('partType')
    public partType!: RangePartType;

    public months: BravoMoment[][] = [];

    public ngOnInit() {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.months = pVal[this.partType].date.getMonths('MMM',3);
        })
        
        this._service.valueChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => { 
            this.selectedDate = pVal;
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectMonth(pDate: BravoMoment) {
        if (this.mode === 'month') {
            this._service.selectDate(pDate);    
            return;
        }
        const panels = this.panels;
        if (!this.isRange) {
            this._service.panels = {
                ...panels,
                [this.partType]: {
                    date: pDate,
                    mode: this.mode
                }
            };
            return;
        }
        let startDate = panels.start.date.clone();
        let startMode = panels.start.mode;
        let endDate = panels.end.date.clone();
        let endMode = panels.end.mode;
        if (this.partType === 'start') {
            startDate = pDate.clone();
            startMode = this.mode;
            endDate = offsetDate(this.mode, startDate, 1);
        }
        if (this.partType === 'end') {
            endDate = pDate.clone();
            endMode = this.mode;
            startDate = offsetDate(this.mode, endDate, -1);
        }
        this._service.panels = {
            start: { date: startDate, mode: startMode },
            end: { date: endDate, mode: endMode }
        };
    }

    public override isSelected(pDate: BravoMoment) {
        if(!this.selectedDate) return false;
        if (!isRangeValue(this.selectedDate)) {
          return this.selectedDate?.isSameMonth(pDate);
        }
        // date range
        const [start, end] = this.selectedDate;
        return (
          (start?.isSameMonth(pDate) ?? false) ||
          (end?.isSameMonth(pDate) ?? false)
        );
    }
}