import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { RangePartType } from '../../bravo-control-date.type';
import { BravoDateService } from '../../bravo-control-date.service';

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

    public selectedYear!: number;
   
    public ngOnInit() {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.selectedYear = pVal[this.partType].date.getFullYear();
            this.years = pVal[this.partType].date.getYears(5, 5);
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectYear(pDate: BravoMoment) {
        this.selectedYear = pDate.getFullYear();
        const panels = this.panels;
        if (!this.isRange) {
            this._service.panels = {
                ...panels,
                [this.partType]: {
                date: pDate,
                mode: this.mode == 'date' ? 'month' : 'year'
                }
            };
            if(this.mode == "year") {
                this._service.value = pDate;
                this._service.hideDatePicker()
            }
            return;
        }
        let startDate = panels.start.date;
        let startMode = panels.start.mode;
        let endDate = panels.end.date;
        let endMode = panels.end.mode;
        if (this.partType === 'start') {
            startDate = pDate;
            startMode = this.mode == 'date' ? 'month' : 'year'
        }
        if (this.partType === 'end') {
            endDate = pDate;
            endMode = this.mode == 'date' ? 'month' : 'year'
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