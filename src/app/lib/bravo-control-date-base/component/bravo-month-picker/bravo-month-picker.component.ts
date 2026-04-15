import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateService } from '../../bravo-control-date.service';
import { CompatibleDate, RangePartType } from '../../bravo-control-date.type';
import { isRangeValue, offset } from '../../bravo-control-date.until';
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

    public selectedMonth!: CompatibleDate;

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
            this.selectedMonth = pVal;
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectMonth(pDate: BravoMoment) {
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
        let startDate = panels.start.date.clone();
        let startMode = panels.start.mode;
        let endDate = panels.end.date.clone();
        let endMode = panels.end.mode;
        if (this.partType === 'start') {
            startDate = pDate.clone();
            startMode = this.mode;
            endDate = offset(this.mode, startDate, 1);
        }
        if (this.partType === 'end') {
            endDate = pDate.clone();
            endMode = this.mode;
            startDate = offset(this.mode, endDate, -1);
        }
        this._service.panels = { 
            start: { date: startDate, mode: startMode },
            end: { date: endDate, mode: endMode }
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
        if(!this.selectedMonth) return false;
        if (!isRangeValue(this.selectedMonth)) {
          return this.selectedMonth?.isSameDay(pDate);
        }
        // date range
        const [start, end] = this.selectedMonth;
        return (
          (start?.isSameDay(pDate) ?? false) ||
          (end?.isSameDay(pDate) ?? false)
        );
    }

    public isInRange(pDate: BravoMoment) {

    }

    public inHoverRange(pDate: BravoMoment) {

    }

}