import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { BravoDateRangeContainerComponent } from './component';
import { BravoDateRangeService } from './bravo-date-range.service';
import { Subject, takeUntil } from 'rxjs';


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
        BravoDateRangeService
        
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

export class BravoDateRangeComponent extends BravoControlBaseComponent implements OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);

    public isOpenPicker = false;

    public startDate = '';
    public endDate = '';

    @ViewChild('startDateInput', {static: true})
    public startDateEl!: ElementRef<HTMLInputElement>;

    @ViewChild('endDateInput', {static: true})
    public endDateEl!: ElementRef<HTMLInputElement>;

    constructor() {
        super();
        this._service.isOpenDatePickerChange$
            .subscribe((pVal) => {
                this.isOpenPicker = pVal;
            })
        
        this._service.selectedStartDateChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                this.startDate = pVal?.format() ?? '';
                this.updateValue(`${this.startDate}${this.endDate}`)
            })
        this._service.selectedEndDateChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                this.endDate = pVal?.format() ?? '';
                this.updateValue(`${this.startDate}${this.endDate}`)
            })
        this._service.editDateChange$
            .subscribe((pVal) => {
            
            })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }


    public showDatePicker() {
        this.focus = true;
        this._service.showDatePicker();
    }

    public hideDatePicker() {
        this.focus = false;
        this._service.hideDatePicker();
    }

    public clear() {
        this.updateValue('')
        this.focus = false;
        this._service.clear();
    }
}