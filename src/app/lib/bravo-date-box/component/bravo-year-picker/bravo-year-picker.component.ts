import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { RangePartType } from '../../bravo-control-date.type';
import { BravoDateService } from '../../service';

@Component({
    selector: 'br-year-picker',
    templateUrl: './bravo-year-picker.component.html',
    styleUrls: ["./bravo-year-picker.component.scss"]
})

export class BravoYearPickerComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
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

    public selectedYear!: number;
   
    public ngOnInit() {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.selectedYear = pVal[this.partType].date.getFullYear();
            this.years = pVal[this.partType].date.getYears(5, 5);
        })
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectYear(pDate: BravoMoment) {
        this.selectedYear = pDate.getFullYear();
       this._service.selectYear(pDate, this.partType);
    }
    
}