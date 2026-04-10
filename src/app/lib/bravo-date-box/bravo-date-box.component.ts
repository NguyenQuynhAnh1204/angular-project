import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { BravoDateContainerComponent } from './component';
import { BravoDateSingleService } from './service';


@Component({
    selector: 'br-date-single',
    templateUrl: './bravo-date-box.component.html',
    styleUrls: ["./bravo-date-box.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDateContainerComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoDateBoxComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BravoDateBoxComponent),
            multi: true
        },
        BravoDateSingleService,
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }, {
        directive: BravoDropdownAnchorDirective
    }],
})
export class BravoDateBoxComponent extends BravoControlBaseComponent implements OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateSingleService);
    public get moment() {
        return this._service.moment;
    }

    public get isOpenDate() {
        return this._service.isOpenDatePicker;
    }

    constructor() {
        super();
        this._service.isOpenDatePickerChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                if(pVal == true) {
                    this.handleFocus()
                } else {
                    this.handleBlur()
                }
                this.updateValue(this._service?.selectDate?.format())
            })
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value = input.value;
        this.textValue = value;
        if (this._validateInputDate(value)) {
            this.updateValue(this.textValue);
            this._service.selectDate = new BravoMoment(BravoMoment.parseDate(value, 'dd/MM/yyyy'));
        } else {
            this.updateValue('');
        }
    }

    private _validateInputDate(pValue: string) {
        const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/; // dd/mm/yyyy
        return regexDate.test(pValue)
    }

    override handleFocus() {
        this.updateValue(this._service.selectDate.format())
        this.focus = true;
    }

    public showDatePicker() {
        this._service.showDatePicker();
    }

    public hideDatePicker() {
        this._service.hideDatePicker();
    }

    public handleOnClear() {
        this.updateValue('');
        this._service.clearSelectDate();
    }
}

