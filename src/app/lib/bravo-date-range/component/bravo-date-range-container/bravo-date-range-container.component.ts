import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { BravoDateRangeService } from '../../bravo-date-range.service';
import { BravoDatePickerRangeComponent } from '../bravo-date-picker-range';
import { BravoMonthPickerRangeComponent } from '../bravo-month-picker-range';
import { BravoYearPickerRangeComponent } from '../bravo-year-picker-range';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { EViewPicker } from 'src/app/lib/bravo-date-box';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'br-date-range-container',
    templateUrl: './bravo-date-range-container.component.html',
    styleUrls: ["./bravo-date-range-container.component.scss"],
    imports: [CommonModule, BravoDatePickerRangeComponent, 
        BravoMonthPickerRangeComponent, BravoYearPickerRangeComponent
    ]
})

export class BravoDateRangeContainerComponent implements OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);
    
    public momentStart = this._service.momentStart;
    public momentEnd = this._service.momentEnd;
    // ngày bắt đầu
    public get selectedStartDate() {
        return this._service.selectedStartDate;
    }
    // ngày kết thúc
    public get selectedEndDate() {
        return this._service.selectedEndDate;
    }

    public viewStartDate = EViewPicker.PICKER_DATE;
    public viewEndDate = EViewPicker.PICKER_DATE;
    public titleStartDate = '';
    public titleEndDate = "";

    constructor() {
        this._service.viewStartChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pViewStart) => {
                this.viewStartDate = pViewStart;
                this._updateTitleStartDate()
            })
        this._service.viewEndChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pViewEnd) => {
                this.viewEndDate = pViewEnd;
                this._updateTitleEndDate()
            })
        this._service.momentStartChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pMoment) => {
                this.momentStart = pMoment;
                this._updateTitleStartDate()
            })
        this._service.momentEndChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pMoment) => {
                this.momentEnd = pMoment;
                this._updateTitleEndDate()
            })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    
    //title start date
    private _updateTitleStartDate() {
        switch (this.viewStartDate) {
            case 1:
                this.titleStartDate =  `Tháng ${this.momentStart.getMonth()+1} năm ${this.momentStart.getFullYear()}`;
                break;
            case 2:
                this.titleStartDate =  `Năm ${this.momentStart.getFullYear()}`;
                break;
            case 3:
                const start = this.momentStart.getYears(5,5)[0][0].getFullYear();
                this.titleStartDate =  `${start} - ${start + 25}`;
                break;
        }
        return ''
    }
    
    // title end date
    private _updateTitleEndDate() {
        switch (this.viewEndDate) {
            case 1:
                this.titleEndDate =  `Tháng ${this.momentEnd.getMonth()+1} năm ${this.momentEnd.getFullYear()}`;
                break;
            case 2:
                this.titleEndDate =  `Năm ${this.momentEnd.getFullYear()}`;
                break;
            case 3:
                const start = this.momentEnd.getYears(5,5)[0][0].getFullYear();
                this.titleEndDate =  `${start} - ${start + 25}`;
                break;
        }
        return ''
    }

    // switch view
    public switchView(pType: 'start' | 'end') {
        if(pType === "start") {
            switch(this._service.viewStart) {
                case 1:
                    this._service.switchView(pType, 3);
                    break;
                case 2:
                    this._service.switchView(pType, 1);
                    break;
                case 3:
                    this._service.switchView(pType, 1);
                    break;
                default:
                    this._service.switchView(pType, 1);
            }
            this._updateTitleStartDate();
        }
        else if(pType === "end") {
            switch(this._service.viewEnd) {
                case 1:
                    this._service.switchView(pType, 3);
                    break;
                case 2:
                    this._service.switchView(pType, 1);
                    break;
                case 3:
                    this._service.switchView(pType, 1);
                    break;
                default:
                    this._service.switchView(pType, 1);
            }
            this._updateTitleEndDate();
        }
    }

    // previous time
    public previousSwitch(pType: 'start' | 'end') {
        this._switch(pType, -1);
    }

    // next time
    public nextSwitch(pType: 'start' | 'end') {
        this._switch(pType, 1);
    }

    private _switch(pType: 'start'| 'end', pSwitch: number = 1) {
        if(pType === "start") {
            const date = this.momentStart.toDate();
            const month = this.momentStart.getMonth();
            const year = this.momentStart.getFullYear();
            switch(this._service.viewStart) {
                case 1:
                    this._service.momentStart = 
                    BravoMoment.set(date, {
                        month: month + pSwitch
                    })
                    this._service.momentEnd = 
                    BravoMoment.set(date, {
                        month: month 
                    })
                    break;
                case 2:
                    this._service.momentStart = 
                    BravoMoment.set(date, {
                        year: year + pSwitch
                    })
                    break;
                case 3:
                    this._service.momentStart = 
                        BravoMoment.set(date, {
                            year: year + pSwitch * 25
                        })
            }
            this._updateTitleStartDate()
            this._updateTitleEndDate()
        } 
        else if (pType == 'end') {
            const date = this.momentEnd.toDate();
            const month = this.momentEnd.getMonth();
            const year = this.momentEnd.getFullYear();
            switch(this._service.viewEnd) {
                case 1:
                    this._service.momentEnd = 
                    BravoMoment.set(date, {
                        month: month + pSwitch
                    })
                    this._service.momentStart = 
                    BravoMoment.set(date, {
                        month: month
                    })
                    break;
                case 2:
                    this._service.momentEnd = 
                    BravoMoment.set(date, {
                        year: year + pSwitch
                    })
                    break;
                case 3:
                    this._service.momentEnd = 
                    BravoMoment.set(date, {
                        year: year + pSwitch * 25
                    })
            }
            this._updateTitleStartDate()
            this._updateTitleEndDate()
        }
    }
}