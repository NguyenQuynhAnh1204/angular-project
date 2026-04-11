import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { PanelState } from '../../bravo-control-date.type';
import { BravoDateSingleService } from '../../service';

@Component({
    selector: 'br-year-picker',
    templateUrl: './bravo-year-picker.component.html',
    styleUrls: ["./bravo-year-picker.component.scss"]
})

export class BravoYearPickerComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateSingleService);
    public get partType() {
        return this._service.inputActive;
    }
    public get date() {
        return this._service.panels[this.partType].date;
    }

    private _years!: BravoMoment[][]
    public get years() {
        return this._years;
    }
    public set years(pYears) {
        this._years = pYears;
    }

    public selectedYear!: number;
   
    public ngOnInit() {
        this._service.inputActiveChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.selectedYear = this._service.panels[pVal].date.getFullYear();
            this.years = this._service.panels[pVal].date.getYears(5, 5);
        })
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectYear(pDate: BravoMoment) {
        this.selectedYear = pDate.getFullYear();
        this._service.panels = {
            ...this._service.panels,
            [this.partType]: {mode: 'year', date: pDate}
        }
        this._service.changeMode(this.partType);
    }
    
}