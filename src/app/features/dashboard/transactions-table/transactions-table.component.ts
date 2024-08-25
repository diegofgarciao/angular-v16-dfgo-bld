import { Component, OnInit, Input } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})

export class TransactionsTableComponent {
  @Input() transactions: Transaction[] = [];
}
