import { HomeComponent } from './home.component';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  TESTCARDDATA,
  TESTCONVERSIONRESULT,
  TESTCURRENCIESRESULT,
  TESTFORMDATA,
} from 'src/app/core/data/test-data';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: any;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
  beforeEach(waitForAsync(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', [
      'convertCurrencies',
      'convertCurrency',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        dataService = TestBed.inject(DataService);
        component.amount = '50';
        component.from = 'EUR';
        component.to = 'USD';
        dataService.convertCurrency.and.returnValue(of(TESTCONVERSIONRESULT));
        dataService.convertCurrencies.and.returnValue(of(TESTCURRENCIESRESULT));
        component.loadCardData();
        component.convert(TESTFORMDATA);

        fixture.detectChanges();
      });
  }));
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Currency Exchanger'`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Currency Exchanger'
    );
  });

  it('should render Currency Converter Component', () => {
    const childDebugElement = fixture.debugElement.query(
      By.css('app-currency-converter')
    );
    expect(childDebugElement.nativeElement).toBeTruthy();
  });

  it('should get correct Conversion result for testData', () => {
    expect(component.rateResult).toEqual(TESTCONVERSIONRESULT);
  });

  it('should get correct Conversion result for other currencies', () => {
    expect(component.cardObject).toEqual(TESTCARDDATA);
  });

  it('should render 9 Card Currency Component', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('app-currency-card'));
    expect(cards.length).toBe(9);
  });

  it('should confirm Currency Converter Component Input property Match rateResult', () => {
    const childDebugElement = fixture.debugElement.query(
      By.css('app-currency-converter')
    );
    const data = childDebugElement.componentInstance.currencyResult;
    if (data) expect(data).toEqual(component.rateResult);
    else expect(data).toEqual(undefined);
  });

  it('should navigate on openDetail call', () => {
    component.openDetail();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/EUR/USD/detail', {
      state: { currencyResult: TESTCONVERSIONRESULT },
    });
  });
});
