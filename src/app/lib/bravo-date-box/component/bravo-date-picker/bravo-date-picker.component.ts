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

    public selectedDate = this.moment.toDate();

    public dates: BravoMoment[][] = [];

    public days: string[] = []

    public constructor() {
        this.dates = this.service.moment.getWeeks();
        this.days = this.moment.getDays();
        console.log(this.selectedDate);
    }

    public onSelectDate(pDate: Date) {
        this.selectedDate = pDate;
        this.service.moment = BravoMoment.set(this.moment.toDate(), {date: pDate.getDate()});
        this._overlay.detach();
    }
}