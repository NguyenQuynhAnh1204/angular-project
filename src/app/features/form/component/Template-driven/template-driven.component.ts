import { Component, ViewChild } from '@angular/core';
import { Form, FormControl, NgForm } from '@angular/forms';

export interface IUser {
    name: string;
    email: string;
    password: string;
}

@Component({
    selector: 'template-driven',
    templateUrl: './template-driven.components.html',
    styleUrls: ["./template-driven.component.scss"]
})

export class TemplateDrivenComponent {
    public user: IUser = {
        name: "",
        email: "",
        password: ""
    }

    public emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    public handleOnSubmit(pForm: NgForm) {
        if(pForm.invalid) return;
        console.log('Submit');
        pForm.reset();
    }

}