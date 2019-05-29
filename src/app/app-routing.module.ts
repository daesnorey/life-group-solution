import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { Col101FormComponent } from './components/col101-form/col101-form.component';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { CanActivateComponentGuard } from './guards/can-activate-component.guard';
import { LoginComponent } from './components/login/login.component';
import { CanActivateLoginGuard } from './guards/can-activate-login.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [CanActivateComponentGuard]
  },
  {
    path: 'col-101',
    component: Col101FormComponent,
    canActivate: [CanActivateComponentGuard]
  },
  {
    path: 'bulk',
    component: BulkUploadComponent,
    canActivate: [CanActivateComponentGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateLoginGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
