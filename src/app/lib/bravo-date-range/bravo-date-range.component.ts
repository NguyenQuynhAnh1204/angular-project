import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlDirective } from '../bravo-control-base';
import { BravoDateControlComponent, BravoDatePopupComponent, BravoDateService, CompatibleDate } from '../bravo-control-date-base';


@Component({
    selector: 'br-date-range',
    templateUrl: './bravo-date-range.component.html',
    styleUrls: ["./bravo-date-range.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDatePopupComponent],
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
        BravoDateService
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
export class BravoDateRangeComponent extends BravoDateControlComponent implements OnInit, AfterViewInit {
    private _destroy$ = new Subject<void>();
    public get isOpenDatePicker() {
        return this._service.isOpenDatePicker;
    }
    public get value() {
        return this._service.value;
    }
    public get inputActive() {
        return this._service.inputActive;
    }

    @ViewChildren('rangePickerInput')
    public rangePickerInput!: QueryList<ElementRef<HTMLInputElement>>

    public ngOnInit() {
        this._service.valueChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this._setInputValue(pVal);
        })
    }

    public ngAfterViewInit() {
        this.rangePickerInput?.forEach((item) => {
            item?.nativeElement.addEventListener('focusout', this.onFocusOut.bind(this))
        })
    }

    public override onFocus(pEvent: FocusEvent): void {
        const target = pEvent.target as HTMLInputElement;
        if(target == this.rangePickerInput.first.nativeElement) {
            this._service.inputActive = 'start'
        } 
        else if(target == this.rangePickerInput.last.nativeElement) {
            this._service.inputActive="end"
        }
    }

    public override updateValue(pVal: [string, string]) {
        this.textValue = `${pVal[0]}${pVal[1]}`;
        if(!this.rangePickerInput) return;
        this.rangePickerInput.forEach((input, index) => {
            input.nativeElement.value = pVal[index];
        })
        this.onChange(this.textValue);
    }

    public override _setInputValue(pValue: CompatibleDate) {
        const dateRange = Array.isArray(pValue) ? pValue : [null, null];
        const [start, end] = dateRange;
        const format = this.getFormat();
        if(!start && !end) this.inputValue = ['', ''];
        const inputStart = start?.format(format) ?? '';
        const inputEnd = end?.format(format) ?? '';
        if(!end) {
            this.inputValue = [inputStart , '']
        } else if(!start) {
            this.inputValue = ['', inputEnd]
        } else {
            this.inputValue = [inputStart, inputEnd]
        }
        this.updateValue(this.inputValue);
    }
    
    public override _setValue(pVal: string) {
        const format = this.getFormat();
        const parseDate = BravoMoment.parseDate(pVal, format);
        const date = new BravoMoment(parseDate);
        const dateValue = Array.isArray(this.value)
            ? this.value
            : [null, null];
        let [start, end] = dateValue;
        if (this.inputActive === 'start') {
            start = date;
        }
        if (this.inputActive === 'end') {
            end = date;
        }
        if (start && end && start.getTime() > end.getTime()) {
            [start, end] = [end, start];
        }
        this._service.value = [start, end];
    }
}