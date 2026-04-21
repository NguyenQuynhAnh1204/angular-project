import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Component, inject, Input } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { BravoDateService } from './bravo-date-base.service';
import { CompatibleDate, DateMode, DateSingleValue, DateValue, RangePartType, SingleDate } from './bravo-date-base.type';
import { FormGroupDirective } from '@angular/forms';
import { formatByPattern } from './bravo-date-base.utilities';
import { DATE_FORMAT_REGEX, FORMAT_DATE } from './bravo-date-base.definition';

@Component({
    selector: 'br-date-base',
    template: '',
})

export class BravoDateBaseComponent extends BravoControlBaseComponent<DateValue> {
    protected _formDir = inject(FormGroupDirective);
    protected _focusMonitor = inject(FocusMonitor);
    protected _service = inject(BravoDateService);
    public get inputActive() {
        return this._service.inputActive;
    }

    protected _dateValue!: DateValue;

    private _mode: DateMode = 'date';
    @Input('mode')
    public get mode() {
        return this._mode;
    }
    public set mode(pMode) {
        this._mode = pMode;
    }

    public onClickInputBox(pPart: RangePartType) {
        this._service.inputActive = pPart;
        this.openDatePicker(true)
    }

    public onInputChange(pEvent: Event) {
        const value = (pEvent.target as HTMLInputElement).value;
        if (!value) {
            this._setValue(null)
        }
        const valid = this._validateInput(value);
        if (valid) {
            const date = this._parseInputValue(value)
            this._setValue(date);
        }
    }

    public showDatePicker(pEvent: MouseEvent) {
        pEvent.preventDefault();
        this.openDatePicker(true);
    }

    public openDatePicker(pOpen: boolean) {
        if(!pOpen) {
            this.updateValue(this._dateValue);
        }
        this._service.openDatePicker(pOpen);
    }

    public handleOnClear(pEvent: MouseEvent) {
        pEvent.preventDefault();
        this._service.clearSelectDate();
    }

    public getPlaceholder(partType?: RangePartType) {
        switch (this.mode) {
            case 'date':
                return partType ? partType == 'start' ? 'Start date' : 'End date' : 'Select dated';
            case 'month':
                return partType ? partType == 'start' ? 'Start month' : 'End month' : 'Select month';
            case 'year':
                return partType ? partType == 'start' ? 'Start year' : 'End year' : 'Select year';
        }
    }

    private _parseInputValue(pVal: string) {
        if (!pVal) return null;
        const format = this.getFormat();
        const parse = BravoMoment.parseDate(pVal, format);
        return parse.isValid() ? parse : null;
    }

    private _validateInput(pVal: string) {
        if (!pVal) return false;
        const regex = DATE_FORMAT_REGEX[this.mode]
        return regex.test(pVal);
    }

    protected _setInputValue(pValue: CompatibleDate) { }

    protected _setValue(pDate: SingleDate) { }

    public getFormat() {
        return FORMAT_DATE[this.mode];
    }

    public displayValue(pDate: DateSingleValue) {
        if (!pDate) return '';
        return formatByPattern(
            pDate,
            this.getFormat()
        );
    }

    public isEmptyValue(pDate: DateValue): boolean {
        if (!pDate) return true;
        if (pDate instanceof Date) return false;
        return !pDate.start && !pDate.end;
    }

    public focusChange(pOrigin: FocusOrigin) {
        if (pOrigin) {
            this.focus = true;
            this.openDatePicker(true);
        } else {
            this.focus = false;
        }
    }
}