import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { BravoButtonComponent, BravoItemComponent, DocumentFileComponent, ExampleComponent, FileItemComponent, HighlightDirective, SizerComponent, StarPipe } from './component';
import { UploadFileComponent } from './uploadfile.component';

const UPLOADFILE_ROUTERS: Routes = [
  {
    path: '',
    component: UploadFileComponent,
  },
];


@NgModule({
    imports: [CommonModule, RouterModule.forChild(UPLOADFILE_ROUTERS),
        ɵInternalFormsSharedModule, FormsModule
    ],
    exports: [UploadFileComponent],
    declarations: [UploadFileComponent, DocumentFileComponent, FileItemComponent, 
      ExampleComponent, BravoButtonComponent, BravoItemComponent,
      SizerComponent, HighlightDirective, StarPipe],
    providers: [],
})
export class UploadfileModule { }
