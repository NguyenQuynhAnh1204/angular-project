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
        const month = this.moment.getMonth()+1;
        const year = this.moment.getFullYear();
        if(this.service.view == 1) {
            return `Tháng ${month} năm ${year}`
        }
        else if(this.service.view == 2) {
            return `Năm ${year}`
        }
        else if(this.service.view == 3) {
            const startYear = year - 14
            const endYear = startYear + 25
            return `${startYear} - ${endYear}`
        }
        return ''
    }


    public previousSwitch() {
        this._switch(-1)
    }

    public nextSwitch() {
        this._switch(1)
    }

    private _switch(pNumber: number) {
        const date = this.moment.toDate();
        const month = this.moment.getMonth();
        const year = this.moment.getFullYear();
        if (this.service.view === 1) {
            this.service.moment =
                BravoMoment.set(date, {
                    month: month + pNumber
                });
        }
        else if (this.service.view === 2) {
            this.service.moment =
                BravoMoment.set(date, {
                    year: year + pNumber
                });
        }
        else if (this.service.view === 3) {
            this.service.moment =
                BravoMoment.set(date, {
                    year: year + pNumber * 25
                });
        }
    }
}