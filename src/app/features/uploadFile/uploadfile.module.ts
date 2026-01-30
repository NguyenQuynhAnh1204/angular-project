import { NgModule } from '@angular/core';
import { UploadFileComponent } from './uploadfile.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { DocumentFileComponent, FileItemComponent } from './component';
import { MaterialModule } from 'src/app/material/material.module';

const UPLOADFILE_ROUTERS: Routes = [
  {
    path: '',
    component: UploadFileComponent,
  },
];


@NgModule({
    imports: [CommonModule, RouterModule.forChild(UPLOADFILE_ROUTERS),
        ɵInternalFormsSharedModule, FormsModule, MaterialModule
    ],
    exports: [UploadFileComponent],
    declarations: [UploadFileComponent, DocumentFileComponent, FileItemComponent],
    providers: [],
})
export class UploadfileModule { }
