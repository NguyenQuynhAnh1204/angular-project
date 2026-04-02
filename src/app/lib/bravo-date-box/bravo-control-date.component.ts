import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { BravoDateContainerComponent } from "./component";
import { BravoDateService } from './service';

@Component({
    selector: 'br-control-date',
    templateUrl: './bravo-control-date.component.html',
    styleUrls: ["./bravo-control-date.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDateContainerComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoControlDateComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BravoControlDateComponent),
            multi: true
        },
        BravoDateService,
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }]
})

export class BravoControlDateComponent extends BravoControlBaseComponent implements OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment$;
    }

    private _isOpenDate = false;
    public get isOpenDate() {
        return this._isOpenDate;
    }
    public set isOpenDate(pOpen) {
        this._isOpenDate = pOpen;
    }
    
    constructor() {
        super();
        this.service.isOpenDatePickerChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                this.isOpenDate = pVal;
                this.updateValue(this.service?.selectDate?.format())
                
            })
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
    }

    public showDatePicker() {
        this.handleFocus()
        this.service.showDatePicker();
    }

    public hideDatePicker() {
        this.handleBlur()
        this.service.hideDatePicker();
    }

}

