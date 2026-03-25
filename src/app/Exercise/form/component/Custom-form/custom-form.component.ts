import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
    standalone: true,
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
            multi: true
        }
    ]
})

export class CustomFormComponent implements ControlValueAccessor, Validator  {

    private _quantity = 0;
    get quantity() {
        return this._quantity;
    }  
    set quantity(pNumber: number) {
        this._quantity = pNumber;
    } 

    public onChange = (pQuantity: number) => {};

    public onTouched = ()=>{};

    private _disabled = false;
    public get disabled() {
        return this._disabled;
    }
    public set disabled(pDisable) {
        this._disabled = pDisable;
    }

    public handleIncrease() {
        this.onTouched();
        if(!this.disabled) {
            this.quantity++;
            this.onChange(this.quantity);
        }
    }
    
    public handleDecrease() {
        this.onTouched();
        if(!this.disabled) {
            this.quantity--;
            this.onChange(this.quantity);
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
        const value = pControl.value;

        if(value > 0) return null;
        return {
            'quantity': {
                min : 1
            } 
        }

    }
}
