import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CardService } from 'src/app/budgetify/budgetify/card/services/card.service';
import { TransactionsService } from 'src/app/budgetify/budgetify/main/transactions/services/transactions.service';

describe('AuthService - testing', () => {
  let httpController: HttpTestingController;

  let service: AuthService;

  let cardServiceSpy: jasmine.SpyObj<CardService>;
  let transactionsServiceSpy: jasmine.SpyObj<TransactionsService>;

  beforeEach(() => {
    const spyCard = jasmine.createSpyObj(
      'cardServiceSpy',
      {},
      { accountCards: [1,2,3] }
    );
    const spyTransactions = jasmine.createSpyObj(
      'transactionsServiceSpy',
      {},
      { transactionsCards: [1,2,3] }
    );
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        AuthService,

        { provide: CardService, useValue: spyCard },
        { provide: TransactionsService, useValue: spyTransactions },
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);

    cardServiceSpy = TestBed.inject(CardService) as jasmine.SpyObj<CardService>;
    transactionsServiceSpy = TestBed.inject(
      TransactionsService
    ) as jasmine.SpyObj<TransactionsService>;
  });

  it('AuthService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSession have to call on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expectedResult = {
      id: 'id',
      email: 'email',
      role: 'role',
      token: 'token',
      expiresIn: 3600000,
      country: 'country',
    };
    service.login('email', 'psw').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `http://localhost:3000/login`,
    });
    req.flush(expectedResult);
  });

  it('isLoggedIn return true'),()=>{
    service.expiresIn = '36000000';
    const result = service.isLoggedIn();
    expect(result).toBe(true)
  }

  it('logout test'),()=>{
    
    expect(cardServiceSpy.accountCards).toBe([])
    expect(transactionsServiceSpy.transactionsCards).toBe([])
  }
});
