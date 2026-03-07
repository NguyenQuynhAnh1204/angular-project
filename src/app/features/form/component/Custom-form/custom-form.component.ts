import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
    selector: 'custom-form',
    templateUrl: './custom-form.component.html',
    styleUrls: ["./custom-form.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CustomFormComponent,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CustomFormComponent,
            multi: true,
        }
    ]
})

export class CustomFormComponent implements ControlValueAccessor, Validator  {

    public quantity = 0;
    public onChange = (pQuantity: number) => {}

    public onTouched = () => {}

    private _touched = false;
    public get touched() {
        return this._touched;
    }
    public set touched(pTouch) {
        this._touched = pTouch;
    }

    private _disabled = false;
    public get disabled() {
        return this._disabled;
    }
    public set disabled(pDisable) {
        this._disabled = pDisable;
    }

    public handleIncrease() {
        this._markAsTouche();
        if(!this.disabled) {
            this.quantity++;
            this.onChange(this.quantity);
        }
    }

    public handleDecrease() {
        this._markAsTouche();
        if(!this.disabled) {
            this.quantity--;
            this.onChange(this.quantity);
        }
    }

    private _markAsTouche() {
        if(!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
    
    public writeValue(pQuantity: number) {
        this.quantity = pQuantity;
    }

    public registerOnChange(pOnChange: any) {
        this.onChange = pOnChange
    }

    public registerOnTouched(pOnTouch: any) {
        this.onTouched = pOnTouch;
    }

    public setDisabledState(pDisabled: boolean) {
        this.disabled = pDisabled;
    }

    public validate(pControl: AbstractControl): ValidationErrors | null {
        const quantity = pControl.value;
        if(quantity < 0 ) {
            return {
                mustBePositive: {
                    quantity
                }
            }
        }
        return null;
    }
}   