import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BravoMoment } from '../../bravo-control-date.until';
import { BravoDateService } from '../../service';
import { BravoDatePickerComponent } from '../bravo-date-picker';
import { BravoMonthPickerComponent } from '../bravo-month-picker';
import { BravoYearPickerComponent } from '../bravo-year-picker';

@Component({
    selector: 'br-date-container',
    templateUrl: './bravo-date-container.html',
    styleUrls: ["./bravo-date-container.scss"],
    imports: [CommonModule, BravoDatePickerComponent, 
        BravoMonthPickerComponent, BravoYearPickerComponent],
    
})

export class BravoDateContainerComponent {
    private _service = inject(BravoDateService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment;
    }

    constructor() {
        this.service.view = 1;
    }

    public switchView() {
        if(this._service.view == 1) {
            this._service.view = 3
        } else if (this._service.view == 2) {
            this._service.view = 1
        } else if (this._service.view == 3) {
            this._service.view = 2
        }
        else {
            this._service.view = 1
        }
    }

    public getLabel() {
        if(this.service.view == 1) {
            return `Tháng ${this.moment.getMonth()+1} năm ${this.moment.getFullYear()}`
        }
        else if(this.service.view == 2) {
            return `Năm ${this.moment.getFullYear()}`
        }
        else if(this.service.view == 3) {
            return 'Khoảng năm'
        }
        return ''
    }


    public previousSwitch() {
        if(this.service.view == 1) {
            this.service.moment = BravoMoment.set(this.moment.toDate(), {month: this.moment.getMonth()})
        }
    }

    public nextSwitch() {
        
    }
}