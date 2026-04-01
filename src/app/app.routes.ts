import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/pageNotFound';
export const shellRoutes: Routes = [
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
    path: 'data-entry',
    loadComponent: () =>
      import('./features/bravo-data-entry').then((c) => c.DataEntryComponent),
  },
  {
    path: 'modal',
    loadComponent: () =>
      import('./lib/bravo-modal').then((c) => c.BravoModalComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent, //  => standalone component =>  dùng component thay vì module.
  },
];
