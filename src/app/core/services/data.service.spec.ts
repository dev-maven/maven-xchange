/* tslint:disable:no-unused-variable */

import { getTestBed, TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { environment } from '../../../environments/environment';
import {
  TESTFORMDATA,
  TESTCONVERSIONRESULT,
  TESTCURRENCIESRESULT,
  TESTHISTORICALDATA,
} from '../data/test-data';
import { CURRENCIES } from '../data/currencies';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('Service: DataService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve converted currency result', () => {
    const service: DataService = TestBed.inject(DataService);
    let result: any;
    let formData = TESTFORMDATA;
    service.convertCurrency(formData).subscribe((res) => (result = res));

    const req = httpMock.expectOne(
      `${baseUrl}currency_data/convert?to=${formData.to}&from=${formData.from}&amount=${formData.amount}`
    );

    expect(req.request.method).toEqual('GET');
    req.flush(TESTCONVERSIONRESULT);
    expect(result).toBeTruthy();
    expect(result).toEqual(TESTCONVERSIONRESULT);
    expect(result.result).toBe(52.6975);
    expect(result.success).toBeTruthy();
  });

  it('should retrieve 9 converted currencies result', () => {
    const service: DataService = TestBed.inject(DataService);
    let result: any;
    let source = 'EUR';
    let currencies = CURRENCIES;
    service
      .convertCurrencies(source, currencies)
      .subscribe((res) => (result = res));

    const req = httpMock.expectOne(
      `${baseUrl}currency_data/live?source=${source}&currencies=${currencies.toString()}`
    );

    expect(req.request.method).toEqual('GET');
    req.flush(TESTCURRENCIESRESULT);
    expect(result).toBeTruthy();
    expect(result).toEqual(TESTCURRENCIESRESULT);
    expect(Object.keys(result.quotes).length).toBe(9);
    expect(result.success).toBeTruthy();
  });

  it('should retrieve historical result for supplied date', () => {
    const service: DataService = TestBed.inject(DataService);
    let result: any;
    let today = '2022-12-01',
      source = 'EUR',
      currencies = 'USD';
    service
      .history(source, currencies, today)
      .subscribe((res) => (result = res));

    const req = httpMock.expectOne(
      `${baseUrl}currency_data/historical?source=${source}&currencies=${currencies}&date=${today}`
    );

    expect(req.request.method).toEqual('GET');
    req.flush(TESTHISTORICALDATA);
    expect(result).toBeTruthy();
    expect(result).toEqual(TESTHISTORICALDATA);
    expect(result.date).toEqual(today);
    expect(result.success).toBeTruthy();
  });
});
