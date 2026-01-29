// material.module.ts
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  exports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,MatProgressBarModule
  ]
})
export class MaterialModule {}
