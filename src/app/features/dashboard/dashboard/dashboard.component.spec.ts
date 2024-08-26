import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TransactionsService } from '../transactions-table/transactions.service';
import { of } from 'rxjs';
import * as moment from 'moment';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardComponent,
        { provide: TransactionsService, useClass: MockTransactionsService }
      ]
    });

    component = TestBed.inject(DashboardComponent);
    service = TestBed.inject(TransactionsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getTransactions and initialize values', () => {
    component.ngOnInit();

    expect(service.getTransactions).toBeDefined();
    expect(component.transactions.length).toBe(1);
    expect(component.filteredTransactions.length).toBe(1);
    expect(component.totalAmount).toBe(100);
    expect(component.totalDateRange).toBe('');
  });

  it('filterByDate should apply the correct filter', () => {
    const now = moment().valueOf();
    component.transactions = [
      { id: '1', amount: 100, createdAt: now, salesType: 'TERMINAL', paymentMethod: 'card', status: 'completed', transactionReference: 12345 }
    ];

    component.filterByDate('today');
    expect(component.selectedDateFilter).toBe('today');
    expect(component.filteredTransactions.length).toBe(1);
  });

  it('filterByMonth should apply the correct month filter', () => {
    const dateInMarch = moment().month(2).date(15).valueOf();
    component.transactions = [
      { id: '1', amount: 100, createdAt: dateInMarch, salesType: 'TERMINAL', paymentMethod: 'card', status: 'completed', transactionReference: 12345 }
    ];

    const event = { target: { value: '3' } } as unknown as Event;
    component.filterByMonth(event);
    expect(component.selectedMonth).toBe('3');
    expect(component.filteredTransactions.length).toBe(1);
  });

  it('filterBySearch should filter transactions by search term', () => {
    component.transactions = [
      { id: '1', status: 'completed', paymentMethod: 'card', amount: 100, createdAt: Date.now(), salesType: 'TERMINAL', transactionReference: 12345 }
    ];

    const event = { target: { value: '1' } } as unknown as Event;
    component.filterBySearch(event);
    expect(component.filteredTransactions.length).toBe(1);
  });

  it('calculateTotal should calculate the total amount correctly', () => {
    component.filteredTransactions = [
      { id: '1', amount: 100, createdAt: Date.now(), salesType: 'TERMINAL', paymentMethod: 'card', status: 'completed', transactionReference: 12345 },
      { id: '2', amount: 200, createdAt: Date.now(), salesType: 'PAYMENT_LINK', paymentMethod: 'card', status: 'completed', transactionReference: 12346 }
    ];

    component.calculateTotal();
    expect(component.totalAmount).toBe(300);
  });

  it('applyFilters should filter by selectedDateFilter and salesType', () => {
    const now = moment().valueOf();
    component.transactions = [
      { id: '1', amount: 100, createdAt: now, salesType: 'TERMINAL', paymentMethod: 'card', status: 'completed', transactionReference: 12345 },
      { id: '2', amount: 200, createdAt: now - 86400000, salesType: 'PAYMENT_LINK', paymentMethod: 'card', status: 'completed', transactionReference: 12346 }
    ];

    component.selectedDateFilter = 'today';
    component.filterOptions.TERMINAL = true;
    component.filterOptions.all = false;
    component.applyFilters();
    expect(component.filteredTransactions.length).toBe(1);
    expect(component.selectedFilter).toBe('Cobro con datáfono');
  });

  it('updateTotalDateRange should update the totalDateRange correctly', () => {
    component.selectedDateRange = 'August 2024';
    component.selectedFilter = 'Cobro con link de pago';
    component.updateTotalDateRange();
    expect(component.totalDateRange).toBe('August 2024 - Cobro con link de pago');
  });

  it('toggleFilterMenu should toggle the visibility of the filter menu', () => {
    expect(component.showFilterMenu).toBe(false);
    component.toggleFilterMenu();
    expect(component.showFilterMenu).toBe(true);
  });

  it('getDateRangeText should return correct date range for today', () => {
    const result = component.getDateRangeText('today');
    expect(result).toBe(moment().format('MMMM Do YYYY'));
  });

  it('getDateRangeText should return correct date range for thisWeek', () => {
    const result = component.getDateRangeText('thisWeek');
    const startOfWeek = moment().startOf('week').format('MMMM Do');
    const endOfWeek = moment().endOf('week').format('MMMM Do YYYY');
    expect(result).toBe(`${startOfWeek} - ${endOfWeek}`);
  });

  class MockTransactionsService {
    getTransactions() {
      return of([{
        id: '1',
        amount: 100,
        salesType: 'TERMINAL',
        createdAt: Date.now(),
        paymentMethod: 'card',
        status: 'completed',
        transactionReference: 12345
      }]);
    }
  }

});
