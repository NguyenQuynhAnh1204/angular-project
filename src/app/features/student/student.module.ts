import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent, HighlightRow, HighlightText, RankPipe, StudentTableComponent } from './component/studentTable';
import { StudentComponent } from './student.component';
import { BravoButtonModule } from 'src/app/lib/button';

const STUDENT_ROUTERS: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
];


@NgModule({
    imports: [CommonModule, RouterModule.forChild(STUDENT_ROUTERS),
        ɵInternalFormsSharedModule, FormsModule, BravoButtonModule
    ],
    exports: [StudentComponent],
    declarations: [StudentComponent, StudentTableComponent, ButtonComponent,
      RankPipe, HighlightRow, HighlightText
    ],
    providers: [],
})
export class StudentModule { }
