import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      //{ path: 'pagos', loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsModule) },
      //{ path: 'datos', loadChildren: () => import('../data/data.module').then(m => m.DataModule) },
      //{ path: 'configuracion', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) },
      // Otros módulos adicionales
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
