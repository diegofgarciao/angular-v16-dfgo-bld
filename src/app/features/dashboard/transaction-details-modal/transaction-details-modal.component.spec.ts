import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionDetailsModalComponent } from './transaction-details-modal.component';
import { Transaction } from '../transactions-table/transaction.model';

describe('TransactionDetailsModalComponent', () => {
  let component: TransactionDetailsModalComponent;
  let fixture: ComponentFixture<TransactionDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDetailsModalComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TransactionDetailsModalComponent);
    component = fixture.componentInstance;
  });

  it('should display the correct transaction details', () => {
    const mockTransaction: Transaction = {
      id: '12345',
      amount: 100000,
      createdAt: Date.now(),
      deduction: 100000,
      paymentMethod: 'Credit Card',
      salesType: 'Online',
      status: 'SUCCESSFUL',
      transactionReference: 12345
    };

    component.transaction = mockTransaction;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.modal-amount').textContent).toContain('$100,000.00');
    expect(compiled.querySelector('strong').textContent).toContain('ID transacción Bold:');
  });

});
