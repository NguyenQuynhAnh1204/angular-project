import { Component, inject, OnDestroy } from '@angular/core';
import { BravoDateService } from '../../service';
import { Subject, takeUntil } from 'rxjs';
import { BravoMoment } from '@bravo-infra/core/utils/dates';

@Component({
    selector: 'br-year-picker',
    templateUrl: './bravo-year-picker.component.html',
    styleUrls: ["./bravo-year-picker.component.scss"]
})

export class BravoYearPickerComponent implements OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment$;
    }

    private _years!: BravoMoment[][]
    public get years() {
        return this._years;
    }
    public set years(pYears) {
        this._years = pYears;
    }

    public selectedYear = this.moment.getFullYear();
   
    constructor() {
        this.service.momentChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pMoment) => {
                this.years = pMoment.getYears(5,5);
            })
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public onSelectYear(pYear: BravoMoment) {
        this.selectedYear = pYear.getFullYear();
        this.service.moment$ = BravoMoment.set(this.moment.toDate(), {year: this.selectedYear});
        this.service.switchView(2)
    }
    
}