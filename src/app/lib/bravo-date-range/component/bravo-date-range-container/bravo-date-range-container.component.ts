import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EViewPicker } from 'src/app/lib/bravo-date-box';
import { BravoDateRangeService } from '../../bravo-date-range.service';
import { BravoDatePickerRangeComponent } from '../bravo-date-picker-range';
import { BravoMonthPickerRangeComponent } from '../bravo-month-picker-range';
import { BravoYearPickerRangeComponent } from '../bravo-year-picker-range';
import { BravoMoment } from '@bravo-infra/core/utils/dates';

@Component({
    selector: 'br-date-range-container',
    templateUrl: './bravo-date-range-container.component.html',
    styleUrls: ["./bravo-date-range-container.component.scss"],
    imports: [CommonModule, BravoDatePickerRangeComponent, 
        BravoMonthPickerRangeComponent, BravoYearPickerRangeComponent
    ]
})

export class BravoDateRangeContainerComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);
    
    public get momentStart() {
        return this._service.momentStart;
    }
    public get momentEnd() {
        return this._service.momentEnd;
    } 
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
    
    public get titleStartDate() {
        return this._buildTitle(this.momentStart, this.viewStartDate)
    }
    
    public get titleEndDate() {
        return this._buildTitle(this.momentEnd, this.viewEndDate)
    }

    public ngOnInit() {
        this._service.viewStartChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pViewStart) => {
                this.viewStartDate = pViewStart;
            })
        this._service.viewEndChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pViewEnd) => {
                this.viewEndDate = pViewEnd;
            })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    private _buildTitle(moment: BravoMoment,view:EViewPicker){
        switch(view){
            case EViewPicker.PICKER_DATE:
                return `Tháng ${moment.getMonth()+1} năm ${moment.getFullYear()}`;

            case EViewPicker.PICKER_MONTH:
                return `Năm ${moment.getFullYear()}`;

            case EViewPicker.PICKER_YEAR:
                const start =
                    moment.getYears(5,5)[0][0].getFullYear();

                return `${start} - ${start+25}`;
        }
    }

    // switch view
    public switchView(pType: 'start' | 'end') {
       this._service.toggleView(pType);
    }

    // previous time
    public previousSwitch(pType: 'start' | 'end') {
        this._service.moveCalendar(pType,-1);
    }
    
    // next time
    public nextSwitch(pType: 'start' | 'end') {
        this._service.moveCalendar(pType,1);
    }
}