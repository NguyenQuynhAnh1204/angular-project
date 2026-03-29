import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './components';
import { PageNotFoundComponent } from './components/pageNotFound';



const shellRoutes: Routes = [
  {
    path: 'uploadfile',
    loadChildren: () =>
      import('./features/upload-file').then((r) => r.UPLOADFILE_ROUTERS),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./features/student').then((r) => r.STUDENT_ROUTERS),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee').then((r) => r.EMPLOYEE_ROUTERS),
  },
  {
    path: 'reactive-form',
    loadChildren: () => 
      import('./exercise/form').then((r) => r.REACTIVE_FORM_ROUTER),
  }, 
  {
    path: 'dynamic-form',
    loadChildren: () => 
      import('./exercise/dynamic-form').then((r) => r.DYNAMIC_FORM_ROUTER),
  },
  {
    path: 'data-entry',
    loadComponent: () => 
      import("./features/bravo-data-entry").then((c) => c.DataEntryComponent)
  },
  {
    path: 'modal',
    loadComponent: () =>
      import("./lib/bravo-modal").then((c) => c.BravoModalComponent)
  },
  {
    path: '**',
    component:  PageNotFoundComponent   //  => standalone component =>  dùng component thay vì module.
  }
];

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(shellRoutes),
        BrowserAnimationsModule,
        HeaderComponent,
        FooterComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
