import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { RangePartType } from '../../bravo-date-base.type';
import { isRangeValue, offsetDate } from '../../bravo-date-base.until';
import { BravoDateAbstractComponent } from '../bravo-date-abstract';

@Component({
    selector: 'br-year-picker',
    templateUrl: './bravo-year-picker.component.html',
    styleUrls: ["./bravo-year-picker.component.scss"]
})

export class BravoYearPickerComponent extends BravoDateAbstractComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    public get date() {
        return this._service.panels[this.partType].date;
    }

    @Input('partType')
    public partType!: RangePartType;

    private _years!: BravoMoment[][]
    public get years() {
        return this._years;
    }
    public set years(pYears) {
        this._years = pYears;
    }
   
    public ngOnInit() {
        this._service.panelsChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                this.years = pVal[this.partType].date.getYears(5, 5);
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

    public onSelectYear(pEvent: MouseEvent, pDate: BravoMoment) {
        pEvent.preventDefault();
        const newMode = this.mode == 'year' ? 'year' : 'month'
        if (this.mode === 'year') {
            this._service.selectDate(pDate);    
            return;
        }
        const panels = this.panels;
        if (!this.isRange) {
            this._service.panels = {
                ...panels,
                [this.partType]: {
                date: pDate,
                mode:newMode
                }
            };
            return;
        }
        let startDate = panels.start.date;
        let startMode = panels.start.mode;
        let endDate = panels.end.date;
        let endMode = panels.end.mode;
        if (this.partType === 'start') {
            startDate = pDate;
            startMode = newMode
            endDate = offsetDate(this.mode, pDate, 1)
        }
        if (this.partType === 'end') {
            endDate = pDate;
            endMode = newMode
            startDate = offsetDate(this.mode, pDate, -1)
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

    public override isSelected(pDate: BravoMoment) {
        if(!this.selectedDate) return false;
        if (!isRangeValue(this.selectedDate)) {
          return this.selectedDate?.isSameYear(pDate);
        }
        // date range
        const [start, end] = this.selectedDate;
        return (
          (start?.isSameYear(pDate) ?? false) ||
          (end?.isSameYear(pDate) ?? false)
        );
    }
}