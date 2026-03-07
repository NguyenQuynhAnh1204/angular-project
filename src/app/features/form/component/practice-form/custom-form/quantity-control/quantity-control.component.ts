import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'quantity-control',
    templateUrl: './quantity-control.component.html',
    styleUrls: ["./quantity-control.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: QuantityControlComponent,
            multi: true
        }
    ]
})

export class QuantityControlComponent implements ControlValueAccessor {

    private _quantity = 0;
    public get quantity() {
        return this._quantity;
    }
    public set quantity(pNumber) {
        this._quantity = pNumber;
    }

    private _increment = 0;
    @Input('increment')
    public get increment() {
        return this._increment;
    }
    public set increment(pNumber) {
        this._increment = pNumber;
    }

    public disabled = false;
    public touched = false;

    public onChange = (pQuantity: number) => {}
    public onTouched = () => {}

    public handleIncrease() {
        this._markAsTouched();
        if(!this.disabled) {
            this.quantity += this.increment;
            this.onChange(this.quantity);
        }
    }

    public handleDecrease() {
        this._markAsTouched();
            if(!this.disabled) {
                this.quantity -= this.increment;
                this.onChange(this.quantity);
            }
    }

    public writeValue(pQuantity: number) {
        this.quantity = pQuantity;
    }

    public registerOnChange(pOnChange: any) {
        this.onChange = pOnChange;
    }

    public registerOnTouched(pOnTouched: any) {
        this.onTouched = pOnTouched;
    }

    public setDisabledState(pDisabled: boolean) {
        this.disabled = pDisabled;
    }

    private _markAsTouched() {
        if(!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
}