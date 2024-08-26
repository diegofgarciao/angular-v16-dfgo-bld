import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../transactions-table/transaction.model';

@Component({
  selector: 'app-transaction-details-modal',
  templateUrl: './transaction-details-modal.component.html',
  styleUrls: ['./transaction-details-modal.component.scss']
})
export class TransactionDetailsModalComponent {
  @Input() transaction: Transaction | null = null;
  @Output() close = new EventEmitter<void>();

  ngOnChanges() {
    if (this.transaction) {
      setTimeout(() => {
        document.querySelector('.modal-content')?.classList.add('show');
      }, 10);
    }
  }

  closeModal() {
    document.querySelector('.modal-content')?.classList.remove('show');
    setTimeout(() => this.close.emit(), 300);
  }
}
