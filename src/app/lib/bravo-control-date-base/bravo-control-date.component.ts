import { Component, inject, Input } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { BravoDateService } from './bravo-control-date.service';
import { CompatibleDate, DATE_FORMAT_REGEX, DateMode, FORMAT_DATE, RangePartType, SingleDate } from './bravo-control-date.type';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
    selector: 'br-date-control',
    template: '',
    providers: [BravoDateService]
})

export class BravoDateControlComponent extends BravoControlBaseComponent {
    protected _focusMonitor = inject(FocusMonitor);
    protected _service = inject(BravoDateService);
    public get inputActive() {
        return this._service.inputActive;
    }

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

    public onClickInputBox(pEvent: MouseEvent, pPart: RangePartType) {
        this._service.inputActive = pPart;
        this.showDatePicker(pEvent)
    }

    public onInputChange(pEvent: Event) {
        this._service.openDatePicker(false);
        const value = (pEvent.target as HTMLInputElement).value;
        const valid = this._validateInput(value);
        if(valid) {
            const date = this._parseInputValue(value)
            this._setValue(date);
        }
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

    private _validateInput(pVal: string) {
        if(!pVal) return false;
        const format = this.getFormat();
        const regex = DATE_FORMAT_REGEX[this.mode]
        return regex.test(pVal);
    }

    protected _setInputValue(pValue: CompatibleDate) {}
    
    protected _setValue(pDate: SingleDate) {}

    public getFormat() {
        return FORMAT_DATE[this.mode];
    }
}