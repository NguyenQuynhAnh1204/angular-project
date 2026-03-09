import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ["./reactive-form.component.scss"],
})

export class ReactiveFormComponent {
    
    public profileForm = new FormGroup({
        userName: new FormControl(
            "", 
            [
                Validators.required, 
                Validators.minLength(3),
                Validators.maxLength(20),
                forbiddenUsername()
            ]),
        userEmail: new FormControl(
            "", 
            [
                Validators.required,
                Validators.email,
            ]),
        password: new FormControl(
            "", 
            [
                Validators.required, 
                Validators.minLength(6), 
                Validators.maxLength(10)
            ]
        ),
        confirmPassword: new FormControl(
            "", 
            [Validators.required]
        )
    },{
        validators: comparePassword
    })

    public get userName() {
        return this.profileForm.get("userName");
    }

    public get userEmail() {
        return this.profileForm.get('userEmail')
    }
    
    public get password() {
        return this.profileForm.get('password')
    }
    
    public get confirmPassword() {
        return this.profileForm.get('confirmPassword')
    }

    public onSubmit() {
        const status = this.profileForm.status; 
        if(status == 'INVALID') return;
        this.profileForm.reset();
    }
}

function forbiddenUsername(pUser: string[] = ['admin', 'manager']) {
    return (control: AbstractControl) => {
        return pUser.includes(control.value) ? {
            invalidUsername: true
        } : null
    }
}

function comparePassword(pGroup: AbstractControl) {
    return pGroup.get('password')?.value != pGroup.get('confirmPassword')?.value ? {
        passwordNoMatch: true
    } : null
}