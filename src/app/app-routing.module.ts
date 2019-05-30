import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { Col101FormComponent } from './components/col101-form/col101-form.component';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { CanActivateComponentGuard } from './guards/can-activate-component.guard';
import { LoginComponent } from './components/login/login.component';
import { CanActivateLoginGuard } from './guards/can-activate-login.guard';
import { ControlComponent } from './components/control/control.component';
import { ControlAccountComponent } from './components/control/control-account/control-account.component';
import { ControlInsuredComponent } from './components/control/control-insured/control-insured.component';
import { CanActivateControlGuard } from './guards/can-activate-control.guard';
import { CanActivateCol101InsuredGuard } from './guards/can-activate-col101-insured.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [CanActivateComponentGuard]
  },
  {
    path: 'col-101',
    children: [
      {
        path: '',
        component: Col101FormComponent,
        canActivate: [CanActivateComponentGuard]
      },
      {
        path: ':policy/:insured_id',
        component: Col101FormComponent,
        canActivate: [CanActivateCol101InsuredGuard]
      }
    ]
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
    path: 'control',
    children: [
      {
        path: 'accounts',
        component: ControlAccountComponent,
        canActivate: [CanActivateControlGuard]
      },
      {
        path: 'insured',
        component: ControlInsuredComponent,
        canActivate: [CanActivateControlGuard]
      }
    ],
    component: ControlComponent,
    canActivate: [CanActivateComponentGuard]
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
