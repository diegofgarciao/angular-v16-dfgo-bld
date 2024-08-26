import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TransactionDetailsModalComponent } from './transaction-details-modal/transaction-details-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    TransactionsTableComponent,
    TransactionDetailsModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    DashboardRoutingModule
  ]
})

export class DashboardModule { }
