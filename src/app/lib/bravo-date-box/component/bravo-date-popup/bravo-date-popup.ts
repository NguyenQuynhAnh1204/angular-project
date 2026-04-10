import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { EViewPicker } from '../../bravo-control-date.type';
import { BravoDateSingleService } from '../../service';
import { BravoDatePickerComponent } from '../bravo-date-picker';
import { BravoMonthPickerComponent } from '../bravo-month-picker';
import { BravoYearPickerComponent } from '../bravo-year-picker';

@Component({
    selector: 'br-date-container',
    templateUrl: './bravo-date-popup.html',
    styleUrls: ["./bravo-date-popup.scss"],
    imports: [CommonModule, BravoDatePickerComponent, 
        BravoMonthPickerComponent, BravoYearPickerComponent
    ]
})

export class BravoDateContainerComponent implements AfterViewInit {
    private _service = inject(BravoDateSingleService);
    public get moment() {
        return this._service.moment;
    }
    
    public get view() {
        return this._service.view;
    }
    public get title() {
        return this._buildTitle(this.moment, this.view);
    };

    @Input('isRange')
    public isRange!: boolean;

    public ngAfterViewInit() {
        // console.log(this.isRange);
    }

    
    private _buildTitle(pMoment: BravoMoment, pView: EViewPicker) {
        switch (pView) {
            case EViewPicker.PICKER_DATE:
                return  `Tháng ${pMoment.getMonth()+1} năm ${pMoment.getFullYear()}`;
            case EViewPicker.PICKER_MONTH:
                return  `Năm ${this.moment.getFullYear()}`;
            case EViewPicker.PICKER_YEAR:
                const start = this.moment.clone().getFullYear() - 14;
                return   `${start} - ${start + 25}`;
        }

    }

    public switchView() {
        if(this.view == 1) {
            this._service.switchView(3);
        } else if (this.view == 2) {
            this._service.switchView(1);
        } else if (this.view == 3) {
            this._service.switchView(1);
        }
        else {
            this._service.switchView(1);
        }
    }


    public previousSwitch() {
        this._service.moveCalendar(-1)
    }

    public nextSwitch() {
        this._service.moveCalendar(1)
    }

}