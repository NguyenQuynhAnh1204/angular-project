import { Component, inject, Input } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { BravoDateService } from './bravo-control-date.service';
import { CompatibleDate, DateMode, FORMAT_DATE, RangePartType, SingleDate } from './bravo-control-date.type';

@Component({
    selector: 'br-date-control',
    template: '',
    providers: [BravoDateService]
})

export class BravoDateControlComponent extends BravoControlBaseComponent {
    protected _service = inject(BravoDateService);
    public get inputActive() {
        return this._service.inputActive;
    }
    public _rawInput = '';

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
        pEvent.preventDefault();
        this.showDatePicker(pEvent)
    }

    public onInputChange(pEvent: Event) {
        const input = (pEvent.target as HTMLInputElement); 
        this._rawInput = this.sanitize(input.value);
    }
    
    public onFocus(pEvent: FocusEvent) {
        pEvent.preventDefault();
    }

    public onFocusOut(pEvent: FocusEvent) {
        pEvent.preventDefault();
        const date = this._parseInputValue(this._rawInput);
        this._setValue(date); 
        this.onTouched();
        this.focus = false;
    }

    public onKeyDown(event: KeyboardEvent) {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'Tab'
        ];
        if (allowedKeys.includes(event.key)) return;
        if (/^\d$/.test(event.key)) return;
        if (event.key === '/') return;
        event.preventDefault();
    }

    private sanitize(value: string): string {
        if (!value) return '';
        // chỉ giữ số và /
        value = value.replace(/[^\d/]/g, '');
        // không cho //
        value = value.replace(/\/{2,}/g, '/');
        // ký tự đầu phải là số
        if (value.startsWith('/')) {
            value = value.substring(1);
        }
        // ký tự cuối phải là số
        if (value.endsWith('/')) {
            value = value.slice(0, -1);
        }
        return value;
    }
    
    public showDatePicker(pEvent: MouseEvent) {
        this.openDatePicker(true);
    }

    public openDatePicker(pOpen: boolean) {
        this._service.openDatePicker(pOpen);
    }
    
    public handleOnClear(pEvent: MouseEvent) {
        pEvent.preventDefault();
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

    private _parseInputValue(pVal: string) {
        if(!pVal) return null;
        const format = this.getFormat();
        const parse = BravoMoment.parseDate(pVal, format);
        return parse.isValid() ? parse : null;
    }

    protected _setInputValue(pValue: CompatibleDate) {}
    
    protected _setValue(pDate: SingleDate) {}

    public getFormat() {
        return FORMAT_DATE[this.mode];
    }
}