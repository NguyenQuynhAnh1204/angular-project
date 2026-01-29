import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { DocumentFileComponent, ListProductComponent, ProductItemComponent } from './shared/components';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { FileItemComponent } from './shared/components/file-item';
import { MaterialModule } from 'src/app/material/material.module';

const SHOPPING_ROUTERS: Routes = [
  {
    path: '',
    component: ShoppingComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SHOPPING_ROUTERS), 
    ɵInternalFormsSharedModule, FormsModule, MaterialModule],
  exports: [ShoppingComponent],
  declarations: [
    ShoppingComponent, ListProductComponent, ProductItemComponent, DocumentFileComponent, FileItemComponent
  ],
  providers: [],
})
export class ShoppingModule {}
