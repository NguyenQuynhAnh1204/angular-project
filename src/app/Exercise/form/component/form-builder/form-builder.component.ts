import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomFormComponent } from '../custom-form';

@Component({
    selector: 'form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ["./form-builder.component.scss"],
    imports: [FormsModule, CommonModule, CustomFormComponent, ReactiveFormsModule]
})

export class FormBuilderComponent implements OnDestroy {
    private _sub = new Subscription();
    public formBuild = inject(FormBuilder);

    public logInForm = this.formBuild.group({
        email: ['', [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(4)]],
        totalQuantity: [1, [Validators.required]],
    })

    constructor() {
        this._sub = this.logInForm.get('email')!.valueChanges.subscribe(
            (value) => console.log(value)
        )
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }
    public get email() {
        return this.logInForm.get("email");
    }
    public get password() {
        return this.logInForm.get('password');
    }

    public get totalQuantity() {
        return this.logInForm.get('totalQuantity');
    }

    public onSubmit() {
        console.log(this.logInForm.get("totalQuantity")?.touched);
        const status = this.logInForm.status;
        if(status === 'INVALID') return;
        console.log(this.logInForm.value);
    }

}