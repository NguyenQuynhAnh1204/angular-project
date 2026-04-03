import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { BravoDateRangeContainerComponent } from './component';


@Component({
    selector: 'br-date-range',
    templateUrl: './bravo-date-range.component.html',
    styleUrls: ["./bravo-date-range.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDateRangeContainerComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoDateRangeComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BravoDateRangeComponent),
            multi: true
        },
        
    ],
    hostDirectives: [
        {
            directive: BravoControlDirective,
            inputs: ["formControl"],
        },
        {
            directive: BravoDropdownAnchorDirective
        }
    ]
})

export class BravoDateRangeComponent extends BravoControlBaseComponent {
    private _startDateEl!: ElementRef<HTMLInputElement>;
    @ViewChild('startDate', {static: true})
    public get startDateEl() {
        return this._startDateEl;
    }
    public set startDateEl(pEl) {
        this._startDateEl = pEl;
    }
    
    private _endDateEl!: ElementRef<HTMLInputElement>;
    @ViewChild('endDate', {static: true})
    public get endDateEl() {
        return this._endDateEl;
    }
    public set endDateEl(pEl) {
        this._endDateEl = pEl;
    }

    constructor() {
        super();
    }

    public focusOnDateRange() {
        console.log(this.focus)
        if(this.focus == false) {
            this.startDateEl.nativeElement.focus();
        }
    }

}