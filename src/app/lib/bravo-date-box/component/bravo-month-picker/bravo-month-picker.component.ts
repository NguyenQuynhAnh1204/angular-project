import { Component, inject, Input, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { RangePartType } from '../../bravo-control-date.type';
import { BravoDateSingleService } from '../../service';

@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent implements OnInit {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateSingleService);
    public get date() {
        return this._service.panels[this.partType].date;
    }

    @Input('partType')
    public partType!: RangePartType;

    public selectedMonth!: number;

    public months: BravoMoment[][] = [];

    public ngOnInit() {
        this._service.inputActiveChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.months = this._service.panels[pVal].date.getMonths('MMM',3);
        })
        this.selectedMonth = this.date.getMonth() + 1;
    }

    public onSelectMonth(pDate: BravoMoment) {
        this.selectedMonth = pDate.getMonth() + 1;
        this._service.selectMonth(pDate, this.partType);
    }
}