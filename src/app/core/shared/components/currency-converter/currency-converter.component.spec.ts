/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { CurrencyConverterComponent } from './currency-converter.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CURRENCIES } from '../../../data/currencies';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TESTCONVERSIONRESULT } from '../../../data/test-data';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let form: FormGroup;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, FlexLayoutModule],
      declarations: [CurrencyConverterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    component.currencies = CURRENCIES;
    el = fixture.debugElement;
    form = component.converterForm;
    fixture.detectChanges();
    form.get('amount').patchValue('50');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable other fields if amount is invalid', () => {
    form.get('amount').patchValue(null);
    fixture.detectChanges();
    expect(form.get('from').status).toBe('DISABLED');
    expect(form.get('to').status).toBe('DISABLED');
  });

  it('should enable other fields if amount is valid', () => {
    component.enableForm(form.get('amount').value);
    fixture.detectChanges();
    expect(form.get('from').status).toBe('VALID');
    expect(form.get('to').status).toBe('VALID');
  });

  it('should emit event when Convert button is clicked', fakeAsync(() => {
    spyOn(component.convertCurrency, 'emit');
    component.enableForm(form.get('amount').value);
    fixture.detectChanges();
    const submit: DebugElement = fixture.debugElement.query(
      By.css('.submit-button')
    );
    submit.nativeElement.click();
    fixture.detectChanges();
    expect(component.convertCurrency.emit).toHaveBeenCalledWith(
      component.converterForm.value
    );
  }));

  it('should emit event when Detail button is clicked', fakeAsync(() => {
    spyOn(component.navigateToDetail, 'emit');
    component.enableForm(form.get('amount').value);
    form.get('result').patchValue('100');
    component.showDetailButton = true;
    fixture.detectChanges();
    const navigate: DebugElement = fixture.debugElement.query(
      By.css('.detail-button')
    );
    navigate.nativeElement.click();
    fixture.detectChanges();
    expect(component.navigateToDetail.emit).toHaveBeenCalledWith();
  }));

  it('should set form values to conversion response', fakeAsync(() => {
    component.currencyResult = TESTCONVERSIONRESULT;
    component.ngOnChanges();
    tick(500);
    fixture.detectChanges();
    expect(form.get('amount').value).toBe(
      TESTCONVERSIONRESULT.query.amount.toString()
    );
    expect(form.get('to').value).toBe(TESTCONVERSIONRESULT.query.to);
    expect(form.get('from').value).toBe(TESTCONVERSIONRESULT.query.from);
    expect(form.get('result').value).toBe(
      TESTCONVERSIONRESULT.result.toString()
    );
    expect(component.rate).toBe(TESTCONVERSIONRESULT.info.quote.toString());
  }));
});
