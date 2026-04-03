import { Component, inject } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDateSingleService } from '../../service';

@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent {
    private _service = inject(BravoDateSingleService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment$;
    }

    public selectedMonth = this.moment.getMonth() + 1;

    public months: BravoMoment[][] = [];

    constructor() {
      this.months = this.moment.getMonths('MMM',3);
    }

    public onSelectMonth(pMonth: BravoMoment) {
        this.selectedMonth = pMonth.getMonth();
        this.service.moment$ = BravoMoment.set(this.moment.toDate(), {month: pMonth.getMonth() });
        this.service.switchView(1);
    }
}