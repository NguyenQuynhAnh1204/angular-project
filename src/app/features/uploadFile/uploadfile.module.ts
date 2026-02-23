import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  BravoButtonComponent,
  BravoItemComponent,
  DragDropZoneComponent,
  ExampleComponent,
  FileItemComponent,
  HighlightDirective,
  InputLinkComponent,
  SizerComponent,
  StarPipe,
} from './component';
import { UploadFileComponent } from './uploadfile.component';
import { ByteTypePipe } from './uploadfile.pipe';

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
  ],
  exports: [UploadFileComponent],
  declarations: [
    UploadFileComponent,
    FileItemComponent,
    DragDropZoneComponent,
    InputLinkComponent,
    ExampleComponent,
    BravoButtonComponent,
    BravoItemComponent,
    SizerComponent,
    HighlightDirective,
    StarPipe,
    ByteTypePipe,
  ],
  providers: [],
})
export class UploadfileModule {}
