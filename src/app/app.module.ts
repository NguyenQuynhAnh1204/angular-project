import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent, CounterButtonsComponent, CounterDisplayComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from './share';

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
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./features/student').then((m) => m.StudentModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee').then((m) => m.EmployeeModule),
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(shellRoutes),
    BrowserAnimationsModule,
    ShareModule
  ],
  declarations: [AppComponent, HeaderComponent, FooterComponent, 
    CounterButtonsComponent, CounterDisplayComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
