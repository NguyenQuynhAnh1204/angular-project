import { AfterViewInit, Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
    selector: 'bravo-text-box',
    templateUrl: './bravo-text-box.component.html',
    styleUrls: ["./bravo-tex-box.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: BravoTextBoxComponent,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: BravoTextBoxComponent,
            multi: true
        }
    ]
})

export class BravoTextBoxComponent implements ControlValueAccessor, Validator {
    private _text = '';
    public get textValue() {
        return this._text;
    }
    public set textValue(pText) {
        this._text = pText;
    }

    public touched = false;

    public onChange = (pText: string) => {}
    public onTouched = () => {}

    @Input('label')
    public label!: string;

    @Input("maxLength")
    public maxLength!: number;

    public writeValue(pText: string) {
        this.textValue = pText;
    }
    public registerOnChange(pOnChange: any) {
        this.onChange = pOnChange;
    }
    public registerOnTouched(pOnTouched: any): void {
        this.onTouched = pOnTouched;
    }

    public validate(pControl: AbstractControl): ValidationErrors | null {
        const value = pControl.value;

        if(value) {
            if(value.length > this.maxLength) {
                return {
                    'max': {
                        max: this.maxLength,
                    }
                }
            }
            return null;
        };
        return {
            'notValue': {
                value: ''
            }
        }
    }

    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        this._markAsTouched();
        this.onTouched();
        this.textValue = input.value;
        this.onChange(this.textValue);
    }

    private _markAsTouched() {
        if(!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
}