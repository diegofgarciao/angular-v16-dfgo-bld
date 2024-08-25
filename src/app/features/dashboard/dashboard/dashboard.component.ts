import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions-table/transactions.service';
import { Transaction } from '../transactions-table/transaction.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  months: { value: string; name: string }[] = [];
  totalAmount: number = 0;
  totalDateRange: string = '';
  showFilterMenu = false;
  filterOptions = {
    TERMINAL: false,
    PAYMENT_LINK: false,
    all: true,
  };

  private selectedFilter: string = 'Todas las transacciones';
  private selectedDateRange: string = '';
  private selectedMonth: string = '';
  private selectedDateFilter: string = '';

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.filteredTransactions = this.transactions;
      this.calculateTotal();
      this.updateTotalDateRange();
    });

    this.months = [
      { value: '1', name: 'Enero' },
      { value: '2', name: 'Febrero' },
      { value: '3', name: 'Marzo' },
      { value: '4', name: 'Abril' },
      { value: '5', name: 'Mayo' },
      { value: '6', name: 'Junio' },
      { value: '7', name: 'Julio' },
      { value: '8', name: 'Agosto' },
      { value: '9', name: 'Septiembre' },
      { value: '10', name: 'Octubre' },
      { value: '11', name: 'Noviembre' },
      { value: '12', name: 'Diciembre' },
    ];
  }

  filterByDate(option: string): void {
    this.selectedDateFilter = option;
    this.selectedMonth = '';
    this.applyFilters();
  }

  filterByMonth(event: Event): void {
    const selectedMonth = (event.target as HTMLSelectElement).value;
    this.selectedMonth = selectedMonth;
    this.selectedDateFilter = '';

    this.applyFilters();
  }

  filterBySearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTransactions = this.transactions.filter(
      (transaction) =>
        transaction.status.toLowerCase().includes(searchTerm) ||
        transaction.paymentMethod.toLowerCase().includes(searchTerm) ||
        transaction.id.toLowerCase().includes(searchTerm)
    );
    this.calculateTotal();
    this.updateTotalDateRange();
  }

  calculateTotal(): void {
    this.totalAmount = this.filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }

  applyFilters(): void {
    // Aplica el filtro de fecha primero
    if (this.selectedDateFilter) {
      const now = moment();

      if (this.selectedDateFilter === 'today') {
        this.filteredTransactions = this.transactions.filter((transaction) =>
          moment(transaction.createdAt).isSame(now, 'day')
        );
      } else if (this.selectedDateFilter === 'thisWeek') {
        this.filteredTransactions = this.transactions.filter((transaction) =>
          moment(transaction.createdAt).isSame(now, 'week')
        );
      } else if (this.selectedDateFilter === 'thisMonth') {
        this.filteredTransactions = this.transactions.filter((transaction) =>
          moment(transaction.createdAt).isSame(now, 'month')
        );
      }
      this.selectedDateRange = this.getDateRangeText(this.selectedDateFilter);
    } else if (this.selectedMonth) {
      this.filteredTransactions = this.transactions.filter(
        (transaction) =>
          moment(transaction.createdAt).month() === parseInt(this.selectedMonth) - 1
      );
      this.selectedDateRange = moment()
        .month(parseInt(this.selectedMonth) - 1)
        .format('MMMM YYYY');
    } else {
      this.filteredTransactions = this.transactions;
      this.selectedDateRange = '';
    }

    // Ahora aplica el filtro de método de pago
    if (!this.filterOptions.all) {
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) => {
          if (
            this.filterOptions.TERMINAL &&
            transaction.salesType === 'TERMINAL'
          ) {
            this.selectedFilter = 'Cobro con datáfono';
            return true;
          }
          if (
            this.filterOptions.PAYMENT_LINK &&
            transaction.salesType === 'PAYMENT_LINK'
          ) {
            this.selectedFilter = 'Cobro con link de pago';
            return true;
          }
          return false;
        }
      );
    } else {
      this.selectedFilter = 'Todas las transacciones';
    }

    this.calculateTotal(); // Recalcula el total después de aplicar los filtros
    this.updateTotalDateRange(); // Actualiza la visualización con la fecha y el filtro aplicados
    this.showFilterMenu = false; // Oculta el menú de filtros después de aplicar
  }

  updateTotalDateRange(): void {
    this.totalDateRange = this.selectedDateRange;
    if (this.selectedFilter && this.selectedFilter !== 'Todas las transacciones') {
      this.totalDateRange += ` - ${this.selectedFilter}`;
    }
  }

  getDateRangeText(filter?: string): string {
    if (filter === 'today') {
      return moment().format('MMMM Do YYYY'); // Ej: "agosto 23 2024"
    } else if (filter === 'thisWeek') {
      const startOfWeek = moment().startOf('week').format('MMMM Do');
      const endOfWeek = moment().endOf('week').format('MMMM Do YYYY');
      return `${startOfWeek} - ${endOfWeek}`; // Ej: "agosto 21 - agosto 27 2024"
    } else if (filter === 'thisMonth') {
      return moment().format('MMMM YYYY'); // Ej: "agosto 2024"
    }
    return '';
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

}
