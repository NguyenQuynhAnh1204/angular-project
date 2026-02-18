import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

const shellRoutes: Routes = [
  {
    path: 'shopping',
    loadChildren: () =>
      import('./features/shopping').then((m) => m.ShoppingModule),
  },
  {
    path: 'uploadfile',
    loadChildren: () =>
      import('./features/uploadFile').then((m) => m.UploadfileModule),
  }
];

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(shellRoutes),
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
