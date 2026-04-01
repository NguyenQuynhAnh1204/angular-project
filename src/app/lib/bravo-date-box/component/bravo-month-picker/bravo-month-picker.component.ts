import { Component, inject } from '@angular/core';
import { BravoDateService } from '../../service';
import { BravoMoment } from '../../bravo-control-date.until';

@Component({
    selector: 'br-month-picker',
    templateUrl: './bravo-month-picker.component.html',
    styleUrls: ["./bravo-month-picker.component.scss"]
})

export class BravoMonthPickerComponent {
    private _service = inject(BravoDateService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment;
    }

    public selectedMonth = this.moment.getMonth() + 1;

    public months: number[][] = [];

    constructor() {
      this.months = this.moment.getMonths('MMM',3);
    }

    public onSelectMonth(pMonth: number) {
        this.selectedMonth = pMonth;
        this.service.moment = BravoMoment.set(this.moment.toDate(), {month: this.selectedMonth - 1 });
        this.service.switchView(1);
    }
}