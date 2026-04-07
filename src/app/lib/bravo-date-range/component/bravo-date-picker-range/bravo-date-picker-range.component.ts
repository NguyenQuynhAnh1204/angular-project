import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { BravoDateRangeService } from '../../bravo-date-range.service';

@Component({
    selector: 'br-date-picker-range',
    templateUrl: './bravo-date-picker-range.component.html',
    styleUrls: ["./bravo-date-picker-range.component.scss"]
})

export class BravoDatePickerRangeComponent implements AfterViewInit, OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);  
    
    private _moment!: BravoMoment;
    public get moment() {
        return this._moment;
    }
    public set moment(pMoment) {
        this._moment = pMoment;
    }

    public dates: BravoMoment[][] = [];
    public days: string[] = [];
 
    private _time!: 'start' | 'end';
    @Input('time')
    public get time() {
        return this._time;
    }
    public set time(pTime) {
        this._time = pTime;
    }

    private _dateItem!: QueryList<ElementRef>
    @ViewChildren('dateItem')
    public get dateItem() {
        return this._dateItem;
    }
    public set dateItem(pDateItem) {
        this._dateItem = pDateItem;
    }

    public ngOnInit() {
        if(this.time == 'start') {
            this._service.momentStartChange$
                .pipe(takeUntil(this._destroy$))
                .subscribe((pMoment) => {
                    this.moment = pMoment;
                    this.dates = pMoment.getWeeks();
                })
        }
        if(this.time == "end") {
            this._service.momentEndChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pMoment) => {
                this.moment = pMoment;
                this.dates = pMoment.getWeeks();
            })
        }
        this.days = this.moment.getDays();
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    // public selectDate(pDate: BravoMoment) {
    //     if(!this._service.selectedStartDate) {
    //         this._service.selectedStartDate = pDate;
    //         return;
    //     } 
    //     if(!this._service.selectedEndDate) {
    //         const end = pDate;
    //         const start = this._service.selectedStartDate;
    //         if(end.isBefore(start)) {
    //             this._service.selectedStartDate = pDate;
    //             this._service.selectedEndDate = start;
    //         }
    //         this._service.hideDatePicker()
    //         return;
    //     }
    //     const start = pDate;
    //     const end = this._service.selectedEndDate;
    //     if(end.isBefore(start)) {
    //         this._service.selectedStartDate = pDate;
    //         this._service.selectedEndDate = start;
    //     } else {
    //         this._service.selectedEndDate = pDate;
    //     }
    // }

    public selectDate(pDate: BravoMoment) { 
        if(!this._service.selectedStartDate) { 
            this._service.selectedStartDate = new BravoMoment(pDate);
            this._service.editDate = 'end'; 
        } 
        else if(!this._service.selectedEndDate) { 
            this._service.selectedEndDate = new BravoMoment(pDate); 
            this._service.editDate = 'start'; 
            this._service.hideDatePicker(); 
        } 
        else { 
            if (this._service.editDate === 'start') { 
                const start = new BravoMoment(pDate); 
                const end = this._service.selectedEndDate; 
                if(start.isAfter(end)) { 
                    this._service.selectedStartDate = end 
                    this._service.selectedEndDate = start; 
                } else { 
                    this._service.selectedStartDate = start; 
                } 
                this._service.editDate = 'end'; 
            } else { 
                const start = this._service.selectedStartDate!; 
                const end = new BravoMoment(pDate); 
                if (end.isBefore(start)) { 
                    this._service.selectedStartDate = end; 
                    this._service.selectedEndDate = start; 
                } else { 
                    this._service.selectedEndDate = end; 
                } 
                this._service.editDate = 'start'; 
                this._service.hideDatePicker(); 
            } 
        }
    }
    public isSelected(pDate: BravoMoment) {
        return (this._service.selectedStartDate?.getDate() == pDate.getDate() && 
        this._service.selectedStartDate?.getMonth() == pDate.getMonth() && 
        this._service.selectedStartDate?.getFullYear() == pDate.getFullYear()) ||
        (this._service.selectedEndDate?.getDate() == pDate.getDate() && 
        this._service.selectedEndDate?.getMonth() == pDate.getMonth() && 
        this._service.selectedEndDate?.getFullYear() == pDate.getFullYear());
    }

}