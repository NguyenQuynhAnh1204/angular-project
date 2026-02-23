import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { ButtonComponent, HighlightRow, HighlightText, RankPipe, StudentTableComponent } from './component/studentTable';
import { ShareModule } from 'src/app/share';

const STUDENT_ROUTERS: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
];


@NgModule({
    imports: [CommonModule, RouterModule.forChild(STUDENT_ROUTERS),
        ɵInternalFormsSharedModule, FormsModule, MaterialModule, ShareModule
    ],
    exports: [StudentComponent],
    declarations: [StudentComponent, StudentTableComponent, ButtonComponent,
      RankPipe, HighlightRow, HighlightText
    ],
    providers: [],
})
export class StudentModule { }
