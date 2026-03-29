import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { BravoControlBaseComponent, EControlType, IControlBase } from '../bravo-control-base';
import { BravoControlDateComponent } from '../bravo-control-date';
import { BravoControlNumberComponent } from '../bravo-control-number';
import { BravoTextBoxComponent } from '../bravo-text-box';
import { buildValidator } from '../../shared/until/formValidator.until';
import { BravoErrorComponent } from '../../bravo-error';

@Component({
    selector: 'br-wrapper',
    templateUrl: './bravo-wrapper.component.html',
    styleUrls: ["./bravo-wrapper.component.scss"],
    imports: [CommonModule, BravoErrorComponent]
})

export class BravoWrapperComponent implements AfterViewInit, OnDestroy, OnInit  {

    private destroy$ = new Subject<void>();

    // control Component
    private _control!: typeof BravoControlBaseComponent;
    public get control() {
        return this._control;
    }
    public set control(pControl) {
        if(!pControl) return;
        this._control = pControl;
        this._createControl()
    }

    private _errorMessage!: string;
    public get errorMessage() {
        return this._errorMessage;
    }
    public set errorMessage(pError) {
        this._errorMessage = pError;
    }

    // Input config
    private _config!: IControlBase;
    @Input('config')
    public get config() {
        return this._config;
    }
    public set config(pValue) {
        this._config = pValue;
    }

    // Input form control
    private _formControl!: AbstractControl;
    @Input('formControl')
    public get formControl() {
        return this._formControl;
    }
    public set formControl(pFormControl) {
        this._formControl = pFormControl;
    }

    //control container ref
    private _controlRef!: ViewContainerRef;
    @ViewChild("control", {read: ViewContainerRef, static: true})
    public get controlRef() {
        return this._controlRef;
    }
    public set controlRef(pControl) {
        this._controlRef = pControl;
    }

    public ngOnInit(): void {
        this.formControl.statusChanges.subscribe(() => {
            this.errorMessage = this.getErrorMess(this.formControl);
        })
    }

    public getErrorMess(control: AbstractControl): string {
        if (!control || !control.errors) return '';

        // if (!(control.touched && control.dirty)) return '';

        const firstErrorKey = Object.keys(control.errors)[0];

        return control.errors[firstErrorKey]?.message ?? '';
    }
    
    public ngAfterViewInit() {
        this.selectControl()
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    //Chọn control để render
    public selectControl() {
        const typeControl = this.config.type;
        switch(typeControl) {
            case EControlType.TEXTBOX:
                this.control =  BravoTextBoxComponent;
                break;
            case EControlType.NUMBER:
                this.control = BravoControlNumberComponent;
                break;
            case EControlType.DATE:
                this.control = BravoControlDateComponent;
                break;
            default:
                this.control = BravoTextBoxComponent;
                break;
        }
    }

    private _createControl() {
        const control = this.controlRef.createComponent(this.control);
        // kết nối formControl->component
        this._connectedFormControl(this.formControl, control.instance);
        control.instance.label = this.config.label;
        Object.assign(control.instance, this.config.style);
       
    }

    private _connectedFormControl(pFormControl: AbstractControl, pComponent: BravoControlBaseComponent) {

        // gán formControl vào trong component
        pComponent.formControl = pFormControl;
        
        // thêm validators vào formControl
        if(this.config.validator) {
            const validator = buildValidator(this.config.validator);
            pFormControl.addValidators(validator);
            pFormControl.updateValueAndValidity();
        }

        // kết nối dữ liệu từ form->component
        pComponent.writeValue(pFormControl.value);

        // Form → UI (reactive)
        // khi setValue/reset từ form->control -> phát ra giá trị thay đổi -> writeValue
        const sub = pFormControl.valueChanges
            .subscribe((pVal) => {
                pComponent.writeValue(pVal);
            })
        
        // UI -> Form
        pComponent.registerOnChange((pVal: any)=> {
            pFormControl.setValue(pVal)
        })
        pComponent.registerOnTouched(() => {
            pFormControl.markAsTouched();
        })
    } 
}