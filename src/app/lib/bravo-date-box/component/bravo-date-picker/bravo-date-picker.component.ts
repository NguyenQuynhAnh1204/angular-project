import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { BravoDateService } from '../../service';
import { BravoMoment } from '../../bravo-control-date.until';

@Component({
    selector: 'br-date-picker',
    templateUrl: './bravo-date-picker.component.html',
    styleUrls: ["./bravo-date-picker.component.scss"],
    imports: [CommonModule]
})

export class BravoDatePickerComponent {
    private _overlay = inject(OverlayRef);
    private _service = inject(BravoDateService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment;
    }

    private _dateBoxRef !: QueryList<ElementRef>;
    @ViewChildren('dateItemBox')
    public get dateBoxRef() {
        return this._dateBoxRef;
    }
    public set dateBoxRef(pRef) {
        this._dateBoxRef = pRef;
    }


    public selectedDate = this.moment.toDate();

    public dates: BravoMoment[][] = [];

    public days: string[] = []

    public constructor() {
        console.log(this.selectedDate);
        this.dates = this.service.moment.getWeeks();
        this.days = this.moment.getDays();
    }

    public onSelectDate(pDate: Date) {
        this.selectedDate = pDate;
        this.service.moment = BravoMoment.set(this.moment.toDate(), {date: pDate.getDate()});
        console.log(this.selectedDate);
        this._overlay.detach();
    }
}