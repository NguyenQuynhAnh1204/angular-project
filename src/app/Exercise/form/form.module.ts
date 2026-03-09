import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { BravoButtonModule } from 'src/app/lib/button';
import { BravoFormComponent } from './form.component';
import { ReactiveFormComponent } from './component/Reactive-form/reactive-form.component';
import { FormBuilderComponent } from './component/FormBuilder';
import { TemplateDrivenComponent } from './component/Template-driven';
import { CustomFormComponent } from './component/Custom-form';
import { PracticeFormComponent } from './component/practice-form';
import { LevelControlComponent, PaymentControlComponent, QuantityControlComponent } from './component/practice-form/custom-form';

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
    BravoButtonModule],
    exports: [BravoFormComponent],
    declarations: [BravoFormComponent, ReactiveFormComponent, 
        FormBuilderComponent, TemplateDrivenComponent, CustomFormComponent, PracticeFormComponent,
        QuantityControlComponent, LevelControlComponent, PaymentControlComponent
    ],
    providers: [],
})
export class ReactiveFormModule {
}
