import { Component, Input } from '@angular/core';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})

export class TransactionsTableComponent {
  selectedTransaction: Transaction | null = null;

  @Input() transactions: Transaction[] = [];

  openModal(transaction: Transaction) {
    this.selectedTransaction = transaction;
  }

  closeModal() {
    this.selectedTransaction = null;
  }
}
