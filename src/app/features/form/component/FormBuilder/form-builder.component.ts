import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ["./form-builder.component.scss"]
})

export class FormBuilderComponent implements OnDestroy {
    private _sub = new Subscription();
    public formBuild = inject(FormBuilder);

    public logInForm = this.formBuild.group({
        email: ['', [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(4)]],
    })

    constructor() {
        this._sub = this.logInForm.valueChanges.subscribe(
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


    public onSubmit() {
        const status = this.logInForm.status;
        if(status === 'INVALID') return;
        console.log(this.logInForm.value);
        this.logInForm.reset();
    }

}