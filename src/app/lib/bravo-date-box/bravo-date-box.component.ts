import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { CompatibleDate, RangeDate, RangePartType, SingleDate } from './bravo-control-date.type';
import { BravoDateContainerComponent } from './component';
import { BravoDateService } from './service';


@Component({
    selector: 'br-date-box',
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
        BravoDateService,
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }, {
        directive: BravoDropdownAnchorDirective
    }],
})
export class BravoDateBoxComponent extends BravoControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get isOpenDatePicker() {
        return this._service.isOpenDatePicker;
    }
    public get inputActive() {
        return this._service.inputActive;
    }
    public get value() {
        return this._service.value;
    }

    private _isRange!: boolean;
    // private _isRange = true;
    public get isRange() {
        return this._isRange;
    } 
    public set isRange(pVal) {
        this._isRange = pVal;
    }

    private _inputValue!: [string, string] | string;
    public get inputValue() {
        return this._inputValue;
    }
    public set inputValue(pVal) {
        this._inputValue = pVal;
    }

    @ViewChild('pickerInput')
    public pickerInput?: ElementRef<HTMLInputElement>;
    @ViewChildren('rangePickerInput')
    public rangePickerInput?: QueryList<ElementRef<HTMLInputElement>>

    ngOnInit() {
        this._service.valueChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this._setInputValue(pVal);
        })
    }

    public ngAfterViewInit(): void {
        this.pickerInput?.nativeElement.addEventListener('focusout', this.onFocusOut.bind(this))
        this.rangePickerInput?.forEach((item) => {
            item?.nativeElement.addEventListener('focusout', this.onFocusOut.bind(this))
        })
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    
    public onClickInputBox(pEvent: MouseEvent) {
        pEvent.stopPropagation();
        this.handleFocus();
    }
    
    public onInputChange(pEvent: Event) {
        const value = (pEvent.target as HTMLInputElement).value; 
        const valid = this._validateInputDate(value);
        if (valid) {
            this._setValue(value);
        } else {
            console.log('không hợp lệ')
        }
    }

    public onFocus(pEvent: FocusEvent) {
        const target = pEvent.target as HTMLInputElement;
        if(this.pickerInput) {
            this._service.inputActive = 'start'
        } else if (this.rangePickerInput) {
            if(target == this.rangePickerInput.first.nativeElement) {
                this._service.inputActive = 'start'
            } 
            else if(target == this.rangePickerInput.last.nativeElement) {
                this._service.inputActive="end"
            }
        }
        pEvent.preventDefault();
    }

    public onFocusOut(pEvent: FocusEvent) {
        pEvent.preventDefault();
        this.onTouched();
        this.focus = false;
    }
    
    public showDatePicker() {
        this._service.showDatePicker();
    }
    
    public hideDatePicker() {
        this._service.hideDatePicker();
    }
    
    public handleOnClear() {
        this._service.clearSelectDate();
    }
    
    public getPlaceholder(partType?: RangePartType) {
        return partType ? partType == 'start' ? 'Start date' : 'End date' : 'Select dated';
    }

    override updateValue(pVal: string | [string, string]) {
        if(!Array.isArray(pVal)) {
            this.textValue = pVal;
            if(!this.pickerInput) return;
            this.pickerInput.nativeElement.value = pVal;
        } else {
            this.textValue = `${pVal[0]}${pVal[1]}`;
            if(!this.rangePickerInput) return;
            this.rangePickerInput.forEach((input, index) => {
                input.nativeElement.value = pVal[index];
            })
        }
        this.onChange(this.textValue);
    }
    
    private _validateInputDate(pValue: string) {
        const regex = /^(?:(?:31\/(?:0[13578]|1[02]))|(?:29|30)\/(?:0[13-9]|1[0-2]))\/\d{4}$|^(?:29\/02\/(?:(?:\d\d(?:0[48]|[2468][048]|[13579][26]))|(?:[02468][048]00|[13579][26]00)))$|^(?:0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])\/\d{4}$/
        return regex.test(pValue);
    }

    private _setInputValue(pValue: CompatibleDate) {
        if(!this.isRange) {
            const value = pValue as SingleDate;
            if(!value) {
                this.inputValue = ''
            } else {
                this.inputValue = `${value?.format()}`;
            }
            this.updateValue(this.inputValue);
            return;
        }
        const dateRange = Array.isArray(pValue) ? pValue : [null, null];
        const [start, end] = dateRange;
        if(!start && !end) this.inputValue = ['', ''];
        const inputStart = start?.format() ?? '';
        const inputEnd = end?.format() ?? '';
        if(!end) {
            this.inputValue = [`${inputStart}`, '']
        } else if(!start) {
            this.inputValue = ['', `${inputEnd}`]
        } else {
            this.inputValue = [`${inputStart}`, `${inputEnd}`]
        }
        this.updateValue(this.inputValue);
    }
    
    private _setValue(pVal: string) {
        const parseDate = BravoMoment.parseDate(pVal, 'dd/MM/yyyy');
        const date = new BravoMoment(parseDate);
        // single mode
        if (!this.isRange) {
            this._service.value = date;
            return;
        }
        // đảm bảo luôn là array
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
        // ✅ normalize range
        if (start && end && start.getTime() > end.getTime()) {
            [start, end] = [end, start];
        }
        this._service.value = [start, end];
    }
}
