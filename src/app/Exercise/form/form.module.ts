import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { BravoTextBoxModule } from 'src/app/lib/text-box';
import { CustomFormComponent } from './component/Custom-form';
import { FormBuilderComponent } from './component/FormBuilder';
import { PracticeFormComponent } from './component/practice-form';
import { LevelControlComponent, PaymentControlComponent, QuantityControlComponent } from './component/practice-form/custom-form';
import { ReactiveFormComponent } from './component/Reactive-form/reactive-form.component';
import { TemplateDrivenComponent } from './component/Template-driven';
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
    BravoTextBoxModule],
    exports: [BravoFormComponent],
    declarations: [BravoFormComponent, ReactiveFormComponent, 
        FormBuilderComponent, TemplateDrivenComponent, CustomFormComponent, PracticeFormComponent,
        QuantityControlComponent, LevelControlComponent, PaymentControlComponent
    ],
    providers: [],
})
export class ReactiveFormModule {
}
