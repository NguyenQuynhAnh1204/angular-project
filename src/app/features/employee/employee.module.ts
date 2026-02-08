import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { MaterialModule } from 'src/app/material/material.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeAvatarComponent, EmployeeCardComponent, HideAfterDirective } from './component';


const EMPLOYEE_ROUTERS: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(EMPLOYEE_ROUTERS),
        ɵInternalFormsSharedModule, FormsModule, MaterialModule
    ],
    exports: [EmployeeComponent],
    declarations: [EmployeeComponent, EmployeeAvatarComponent, EmployeeCardComponent,
      HideAfterDirective
    ],
    providers: [],
})
export class EmployeeModule { }
