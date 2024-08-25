import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionsService]
    });

    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTransactions should return an Observable<Transaction[]>', () => {
    const dummyTransactions: Transaction[] = [
      {
        id: '1',
        amount: 100,
        createdAt: Date.now(),
        paymentMethod: 'card',
        salesType: 'TERMINAL',
        status: 'completed',
        transactionReference: 12345
      },
      {
        id: '2',
        amount: 200,
        createdAt: Date.now(),
        paymentMethod: 'paypal',
        salesType: 'PAYMENT_LINK',
        status: 'completed',
        transactionReference: 12346
      }
    ];

    service.getTransactions().subscribe(transactions => {
      expect(transactions.length).toBe(2);
      expect(transactions).toEqual(dummyTransactions);
    });

    const req = httpMock.expectOne('https://bold-fe-api.vercel.app/api');
    expect(req.request.method).toBe('GET');
    req.flush({ data: dummyTransactions }); // Emula la respuesta del backend
  });
});
