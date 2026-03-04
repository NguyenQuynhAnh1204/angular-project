import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
        console.log(this.profileForm.get('userName')?.errors?.['minlength']);
        if(status == 'INVALID') return;
        if(this.confirmPassword?.value != this.password?.value) return;
        console.log("Submit: ", this.profileForm.value);
        this.profileForm.reset();
    }

}