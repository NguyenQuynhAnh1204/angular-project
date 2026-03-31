import { AfterViewInit, Directive, inject, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({ selector: '[br-control-directive]' })
export class BravoControlNameDirective implements AfterViewInit {

    //injector
    private _formContainer = inject(ControlContainer, {optional: true, skipSelf: true})     // lấy formGroup
    private _valueAccessor = inject(NG_VALUE_ACCESSOR, {optional: true, self: true});       // lấy value accessor
    private _validators = inject(NG_VALIDATORS, {optional: true, self: true})               // lấy validators

    private _formControlName!: string;
    @Input()
    public get formControlName() {
        return this._formControlName;
    }
    public set formControlName(pName) {
        this._formControlName = pName;
    }

    private _formControl!: AbstractControl;
    public get formControl() {
        return this._formControl;
    }
    public set formControl(pControl) {
        this._formControl = pControl;
    }
    
    public ngAfterViewInit(): void {
        this._setupFormControl();
        this._setupControlValueAccessor();
    }

    private _setupFormControl() {
        if(!checkControlContainerType(this._formContainer)) return;
        const control = this._formContainer.control.get(this.formControlName);
        if(!control) return;
        this.formControl = control;
    }

    private _setupControlValueAccessor() {
        this._valueAccessor?.forEach((item) => {
            // form -> UI (initial)
            item.writeValue(this.formControl.value);
            // form -> UI (value changes)
            this.formControl.valueChanges.subscribe((pVal) => {
                item.writeValue(pVal)
            })

            // UI -> form
            item.registerOnChange((pVal: any) => {
                this.formControl.setValue(pVal);
            })

            // UI -> form
            item.registerOnTouched(() => {
                this.formControl.markAsTouched();
            })
        });
    }
}

function checkControlContainerType(pParent: ControlContainer | null) {
    return pParent instanceof FormGroupDirective;
}