import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { ListCardComponent, CardComponent } from './shared/components';

const SHOPPING_ROUTERS: Routes = [
  {
    path: '',
    component: ShoppingComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SHOPPING_ROUTERS)],
  exports: [ShoppingComponent],
  declarations: [ShoppingComponent, ListCardComponent, CardComponent],
  providers: [],
})
export class ShoppingModule {}
