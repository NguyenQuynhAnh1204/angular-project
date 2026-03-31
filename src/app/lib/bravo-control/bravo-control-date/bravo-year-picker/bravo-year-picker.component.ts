import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, inject } from '@angular/core';
import { IDateTime, SELECT_TIME } from '../bravo-control-date.type';

@Component({
    selector: 'br-year-picker',
    templateUrl: './bravo-year-picker.component.html',
    styleUrls: ["./bravo-year-picker.component.scss"]
})

export class BravoYearPickerComponent {
    private _overlay = inject(OverlayRef);
    private _date = inject(SELECT_TIME);
    public select$ = new EventEmitter<string>();

    private _current = new Date();
    public get currentYear() {
        return this._current.getFullYear();
    }

    private _selectedYear: Pick<IDateTime, 'year'> = {
        year: -1,
    };
    public get selectedYear() {
        return this._selectedYear;
    }
    public set selectedYear(pYear) {
        this._selectedYear = pYear;
        this.select$.emit(`${pYear.year}`);
        this._overlay.detach();
    }

    private _startYear = this.currentYear;
    public get startYear() {
        return this._startYear;
    }
    public set startYear(pYear) {
        this._startYear = pYear;
        this.rangeYear()
    }
    
    private _endYear = this.currentYear + 24;
    public get endYear() {
        return this._endYear;
    }
    public set endYear(pYear) {
        this._endYear = pYear;
        this.rangeYear()
    }
    
    private _yearRange!: number[]
    public get yearRange() {
        return this._yearRange;
    }
    public set yearRange(pYearRange) {
        this._yearRange = pYearRange;
    }
    
    constructor() {
        if(this._date) {
            this.selectedYear = this.parseFlexibleDate(this._date);
        }
        this.rangeYear()
    }
    
    public previousYear() {
        this.endYear = this.startYear - 1;
        this.startYear = this.endYear - 24;
    }
    
    public nextYear() {
        this.startYear = this.endYear + 1;
        this.endYear = this.startYear + 24
    }
    
    public onSelectYear(pYear: number) {
        this.selectedYear = {
            year: pYear
        }
    }
    
    public onChangeStartYear(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value = Number(input.value);
        this.startYear = value;
        this.endYear = this.startYear + 24
    }
    
    public onChangeEndYear(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value = Number(input.value);
        this.endYear = value;
        this.startYear = this.endYear - 24;
    }

    public rangeYear() {
        this.yearRange = Array.from({ length: this.endYear - this.startYear + 1 },(_, i) => this.startYear + i);
    }

    public parseFlexibleDate(pDateStr: string): Pick<IDateTime, 'year'> {
        if (!pDateStr) return {
            year: -1
        };
        const parts = pDateStr.split('/');
        const year = parts.length >= 1 ? parseInt(parts[parts.length - 1], 10) : -1;

        return {
            year: year
        };
    }
}