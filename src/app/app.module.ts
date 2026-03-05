import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './components';
import { ExerciseModule } from './Exercise';
import { BravoButtonModule } from './lib/button';
import { ReactiveFormModule } from './features/form';

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
  },
  {
    path: 'reactive-form',
    loadChildren: () => 
      import('./features/form').then((m) => m.ReactiveFormModule),
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(shellRoutes),
    BrowserAnimationsModule,
    ExerciseModule,
    BravoButtonModule,
    ReactiveFormModule
  ],
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
