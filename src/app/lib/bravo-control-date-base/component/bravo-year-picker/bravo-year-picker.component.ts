import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateService } from '../../bravo-control-date.service';
import { CompatibleDate, RangeDate, RangePartType } from '../../bravo-control-date.type';
import { isRangeValue, offsetDate } from '../../bravo-control-date.until';

@Component({
    selector: 'br-year-picker',
    templateUrl: './bravo-year-picker.component.html',
    styleUrls: ["./bravo-year-picker.component.scss"]
})

export class BravoYearPickerComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get panels() {
        return this._service.panels;
    }
    public get date() {
        return this._service.panels[this.partType].date;
    }
    public get isRange() {
        return this._service.isRange;
    }
    public get mode() {
        return this._service.mode;
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

    public selectedYear!: CompatibleDate;
   
    public ngOnInit() {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.years = pVal[this.partType].date.getYears(5, 5);
        })
        
        this._service.valueChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => { 
            this.selectedYear = pVal;
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectYear(pDate: BravoMoment) {
        const newMode = this.mode == 'year' ? 'year' : 'month'
        if (this.mode === 'year') {
            this._service.selectRange(pDate);    
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

    public handleOnHover(pDate: BravoMoment) {
        if(!this._service.value && !this.isRange) return;
        this._service.hoverDate = pDate;
    }

    public handleOnLeave() {
        this._service.hoverDate = null;
    }

    public isSelected(pDate: BravoMoment) {
        if(!this.selectedYear) return false;
        if (!isRangeValue(this.selectedYear)) {
          return this.selectedYear?.isSameYear(pDate);
        }
        // date range
        const [start, end] = this.selectedYear;
        return (
          (start?.isSameYear(pDate) ?? false) ||
          (end?.isSameYear(pDate) ?? false)
        );
    }
    
    public isInRange(pDate: BravoMoment) {
        if (!isRangeValue(this.selectedYear)) return false;
        const [start, end] = this.selectedYear;
        if (!start || !end) return false;
        return (pDate.isAfter(start) && pDate.isBefore(end));
    }

    public inHoverRange(pDate: BravoMoment) {
        if (!isRangeValue(this.selectedYear)) return false;
        const [start, end] = this._service.value as RangeDate;
        const hoverDate = this._service.hoverDate;
        if(!hoverDate || !(start ?? end)) return false;
        const anchorTime = start?.getTime() ?? end?.getTime();
        if(!anchorTime) return false;
        const dateTime = pDate.getTime();
        const hoverTime = hoverDate.getTime();
        return dateTime >= Math.min(anchorTime, hoverTime) && 
        dateTime <= Math.max(anchorTime, hoverTime);
    }
    
}