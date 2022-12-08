import { DetailComponent } from './detail.component';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TESTCHARTLABEL, TESTCHARTDATASET } from '../../core/data/test-data';
import {
  TESTCONVERSIONRESULT,
  TESTFORMDATA,
} from 'src/app/core/data/test-data';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let dataService: any;
  let routerSpy = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    routeReuseStrategy: jasmine.createSpy('routeReuseStrategy'),
  };
  beforeEach(waitForAsync(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', [
      'convertCurrency',
      'history',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [DetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ from: 'EUR', to: 'USD' }),
            },
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
        dataService = TestBed.inject(DataService);
        component.from = 'EUR';
        component.to = 'USD';
        dataService.convertCurrency.and.returnValue(of(TESTCONVERSIONRESULT));
        dataService.history.and.returnValue(of(null));
        component.convert(TESTFORMDATA);
        component.labels = TESTCHARTLABEL;
        component.chartData = TESTCHARTDATASET;
        fixture.detectChanges();
      });
  }));
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'EUR - USD Details'`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'EUR - USD Details'
    );
  });

  it('should render Currency Converter Component', () => {
    const childDebugElement = fixture.debugElement.query(
      By.css('app-currency-converter')
    );
    expect(childDebugElement.nativeElement).toBeTruthy();
  });

  it('should render Currency Chart Component', () => {
    const childDebugElement = fixture.debugElement.query(
      By.css('app-currency-chart')
    );
    expect(childDebugElement.nativeElement).toBeTruthy();
  });

  it('should get correct Conversion result for testData', () => {
    expect(component.rateResult).toEqual(TESTCONVERSIONRESULT);
  });

  it('should confirm Currency Converter Component Input property Match rateResult', () => {
    const childDebugElement = fixture.debugElement.query(
      By.css('app-currency-converter')
    );
    const data = childDebugElement.componentInstance.currencyResult;
    if (data) expect(data).toEqual(component.rateResult);
    else expect(data).toEqual(undefined);
  });

  it('should navigate on goHome call', () => {
    component.goHome();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/', {
      state: { currencyResult: TESTCONVERSIONRESULT },
    });
  });
});
