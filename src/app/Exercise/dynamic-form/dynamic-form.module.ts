import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form.component';


const DYNAMIC_FORM_ROUTER: Routes = [
    {
        path: "",
        component: DynamicFormComponent,
    }
]


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(DYNAMIC_FORM_ROUTER)
    ],
    exports: [DynamicFormComponent],
    declarations: [DynamicFormComponent],
    providers: [],
})
export class DynamicFormModule { }
