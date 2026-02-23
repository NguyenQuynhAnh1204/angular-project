import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from 'src/app/share';
import { ListProductComponent, ProductItemComponent } from './shared/components';
import { ShoppingComponent } from './shopping.component';

const SHOPPING_ROUTERS: Routes = [
  {
    path: '',
    component: ShoppingComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SHOPPING_ROUTERS), 
    ɵInternalFormsSharedModule, FormsModule, ShareModule],
  exports: [ShoppingComponent],
  declarations: [
    ShoppingComponent, ListProductComponent, ProductItemComponent
  ],
  providers: [],
})
export class ShoppingModule {}
