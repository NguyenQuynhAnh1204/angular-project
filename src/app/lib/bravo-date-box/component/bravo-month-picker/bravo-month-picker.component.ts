import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDateSingleService } from '../../service';
import { PanelState } from '../../bravo-control-date.type';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent implements OnInit {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateSingleService);
    public get partType() {
        return this._service.inputActive;
    }
    public get date() {
        return this._service.panels[this.partType].date;
    }

    @Output('modeChange')
    public modeChange = new EventEmitter<PanelState>();

    public selectedMonth!: number;

    public months: BravoMoment[][] = [];

    public ngOnInit() {
        this._service.inputActiveChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.months = this._service.panels[pVal].date.getMonths('MMM',3);
        })
        this.selectedMonth = this.date.getMonth();
    }

    public onSelectMonth(pDate: BravoMoment) {
        this.selectedMonth = pDate.getMonth();
        this._service.panels = {
            ...this._service.panels,
            [this.partType]: {mode: 'month', date: pDate}
        }
        this.modeChange.emit({
            mode: 'date',
            date: pDate
        });
    }
}