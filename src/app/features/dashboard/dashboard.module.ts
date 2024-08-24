import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TotalCardComponent } from './total-card/total-card.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    TotalCardComponent,
    TransactionsTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule
  ]
})

export class DashboardModule { }
