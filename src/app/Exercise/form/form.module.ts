import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { BravoTextBoxComponent } from 'src/app/lib/bravo-text-box';
import { CustomFormComponent } from './component/custom-form';
import { FormBuilderComponent } from './component/form-builder';
import { PracticeFormComponent } from './component/practice-form';
import { LevelControlComponent, PaymentControlComponent, QuantityControlComponent } from './component/practice-form/custom-form';
import { ReactiveFormComponent } from './component/reactive-form/reactive-form.component';
import { TemplateDrivenComponent } from './component/template-driven';
import { BravoFormComponent } from './form.component';

const REACTIVE_FORM_ROUTER: Routes = [
    {
        path: "",
        component: BravoFormComponent,
    }
] 


@NgModule({
    imports: [CommonModule,
    RouterModule.forChild(REACTIVE_FORM_ROUTER),
    FormsModule,
    ReactiveFormsModule,
    ɵInternalFormsSharedModule,
    BravoTextBoxComponent
],
    exports: [BravoFormComponent],
    declarations: [BravoFormComponent, ReactiveFormComponent, 
        FormBuilderComponent, TemplateDrivenComponent, CustomFormComponent, PracticeFormComponent,
        QuantityControlComponent, LevelControlComponent, PaymentControlComponent
    ],
    providers: [],
})
export class ReactiveFormModule {
}
