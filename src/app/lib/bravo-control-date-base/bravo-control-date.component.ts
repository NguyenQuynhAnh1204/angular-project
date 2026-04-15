import { Component, inject, Input } from '@angular/core';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { BravoDateService } from './bravo-control-date.service';
import { CompatibleDate, DATE_REGEX, DateMode, MONTH_REGEX, RangePartType, YEAR_REGEX } from './bravo-control-date.type';
import { BravoMoment } from '@bravo-infra/core/utils/dates';

@Component({
    selector: 'br-date-control',
    template: '',
    providers: [BravoDateService]
})

export class BravoDateControlComponent extends BravoControlBaseComponent {
    protected _service = inject(BravoDateService);

    private _mode: DateMode = 'date';
    @Input('mode')
    public get mode() {
        return this._mode;
    }
    public set mode(pMode) {
        this._mode = pMode;
    }

    private _inputValue!: [string, string] | string;
    public get inputValue() {
        return this._inputValue;
    }
    public set inputValue(pVal) {
        this._inputValue = pVal;
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
            }
        }
    
    public onFocus(pEvent: FocusEvent) {
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
        switch(this.mode) {
            case 'date':
                return partType ? partType == 'start' ? 'Start date' : 'End date' : 'Select dated';
            case 'month':
                return partType ? partType == 'start' ? 'Start month' : 'End month' : 'Select month';
            case 'year':
                return partType ? partType == 'start' ? 'Start year' : 'End year' : 'Select year';
        }
    }

    override updateValue(pVal: string | [string, string]) {}
    
    private _validateInputDate(value: string): boolean {
        if (!value) return false;
        switch (this.mode) {
            case 'date':
                return DATE_REGEX.test(value);
            case 'month':
                return MONTH_REGEX.test(value);
            case 'year':
                return YEAR_REGEX.test(value);
            default:
                return false;
        }
    }

    protected _setInputValue(pValue: CompatibleDate) {}
    
    protected _setValue(pVal: string) {}

    public getFormat() {
        switch (this.mode) {
            case "date":  return 'dd/MM/yyyy'
            case 'month': return 'MM/yyyy'
            case 'year':  return 'yyyy'
        }

    }
}