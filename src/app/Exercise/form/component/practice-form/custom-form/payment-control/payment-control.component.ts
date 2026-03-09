import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'payment-control',
    templateUrl: './payment-control.component.html',
    styleUrls: ["./payment-control.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: PaymentControlComponent,
            multi: true
        }
    ]
})

export class PaymentControlComponent implements ControlValueAccessor  {
    private _method: string[] = []
    @Input('method')
    public get method() {
        return this._method;
    } 
    public set method(pMethod) {
        this._method = pMethod;
    }

    private _payment!: string;
    public get payment() {
        return this._payment
    }
    public set payment(pPayment) {
        this._payment = pPayment;
    }

    public touched = false;

    public onChange = (pPayment: string) => {}
    public onTouched = () => {}

    public handleOnChange(pMethodIndex: number) {
        this.payment = this.method[pMethodIndex];
        this.onChange(this.payment);
    }

    public writeValue(pPayment: string) {
        this.payment = pPayment;
    }

    public registerOnChange(pOnChange: any) {
        this.onChange = pOnChange;
    }

    public registerOnTouched(pOnTouched: any) {
        this.onTouched = pOnTouched;
    }

    public setDisabledState(isDisabled: boolean) {
        
    }
}