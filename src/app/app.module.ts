import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './components';
import { PageNotFoundComponent } from './components/pageNotFound';
import { BravoButtonModule } from './lib/button';

const shellRoutes: Routes = [
  {
    path: 'shopping',
    loadChildren: () =>
      import('./features/shopping').then((m) => m.ShoppingModule),
  },
  {
    path: 'uploadfile',
    loadChildren: () =>
      import('./features/upload-file').then((m) => m.UploadfileModule),
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
      import('./exercise/form').then((m) => m.ReactiveFormModule),
  }, 
  {
    path: 'dynamic-form',
    loadChildren: () => 
      import('./exercise/dynamic-form').then((m) => m.DynamicFormModule)
  },
  {
    path: 'panel',
    loadComponent: () => 
      import('./exercise/table-panel').then((c) => c.PanelComponent),
  },
  {
    path: 'data-entry',
    loadComponent: () => 
      import("./features/bravo-data-entry").then((c) => c.DataEntryComponent)
  },
  {
    path: '**',
    component:  PageNotFoundComponent   //  => standalone component =>  dùng component thay vì module.
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(shellRoutes),
    BrowserAnimationsModule,
    BravoButtonModule
  ],
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
