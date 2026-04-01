import { Component, inject } from '@angular/core';
import { BravoDateService } from '../../service';
import { BravoMoment } from '../../bravo-control-date.until';

@Component({
    selector: 'br-year-picker',
    templateUrl: './bravo-year-picker.component.html',
    styleUrls: ["./bravo-year-picker.component.scss"]
})

export class BravoYearPickerComponent {
    private _service = inject(BravoDateService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment;
    }

    private _years!: number[][]
    public get years() {
        return this._years;
    }
    public set years(pYears) {
        this._years = pYears;
    }

    public selectedYear = this.moment.getFullYear();
   
    constructor() {
        this.years = this.moment.getYears(5,5);
    }

    public onSelectYear(pYear: number) {
        this.selectedYear = pYear;
        this.service.moment = BravoMoment.set(this.moment.toDate(), {year: this.selectedYear});
        this.service.switchView(2)
    }
    
}