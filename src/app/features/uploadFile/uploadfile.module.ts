import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  FileItemComponent,
  InputLinkComponent
} from './component';
import { UploadFileComponent } from './uploadfile.component';
import { BravoDropFileModule } from 'src/app/lib';

const UPLOADFILE_ROUTERS: Routes = [
  {
    path: '',
    component: UploadFileComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UPLOADFILE_ROUTERS),
    ɵInternalFormsSharedModule,
    FormsModule,
    BravoDropFileModule
  ],
  exports: [UploadFileComponent],
  declarations: [
    UploadFileComponent,
    FileItemComponent,
    InputLinkComponent,
  ],
  providers: [],
})
export class UploadfileModule {}
