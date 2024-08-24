import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})

export class TransactionsTableComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    console.log('im living!!!!!!')
    this.transactionsService.getTransactions().subscribe(data => {
      this.transactions = data;
      console.log(this.transactions)
    });
  }
}
