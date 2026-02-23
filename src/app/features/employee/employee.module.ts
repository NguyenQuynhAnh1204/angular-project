import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAvatarComponent, EmployeeCardComponent, HideAfterDirective } from './component';
import { EmployeeComponent } from './employee.component';


const EMPLOYEE_ROUTERS: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(EMPLOYEE_ROUTERS),
        ɵInternalFormsSharedModule, FormsModule
    ],
    exports: [EmployeeComponent],
    declarations: [EmployeeComponent, EmployeeAvatarComponent, EmployeeCardComponent,
      HideAfterDirective
    ],
    providers: [],
})
export class EmployeeModule { }
