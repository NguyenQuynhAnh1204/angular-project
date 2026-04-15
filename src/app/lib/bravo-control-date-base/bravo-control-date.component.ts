import { Component, inject, Input } from '@angular/core';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { BravoDateService } from './bravo-control-date.service';
import { CompatibleDate, DateMode, RangePartType } from './bravo-control-date.type';

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
    
    private _validateInputDate(pValue: string) {
        const regex = /^(?:(?:31\/(?:0[13578]|1[02]))|(?:29|30)\/(?:0[13-9]|1[0-2]))\/\d{4}$|^(?:29\/02\/(?:(?:\d\d(?:0[48]|[2468][048]|[13579][26]))|(?:[02468][048]00|[13579][26]00)))$|^(?:0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])\/\d{4}$/
        return regex.test(pValue);
    }

    protected _setInputValue(pValue: CompatibleDate) {}
    
    protected _setValue(pVal: string) {}
}