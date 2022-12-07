import { Component, OnInit } from '@angular/core';
import { ConversionForm } from '../../core/models/conversion-form';
import { DataService } from '../../core/services/data.service';
import { ConvertedCurrency } from '../../core/models/converted-currency';
import { CURRENCIES } from 'src/app/core/data/currencies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  initRate = 0;
  rateResult: ConvertedCurrency;
  supportedCurrencies = CURRENCIES;
  cardObject = {};
  from = '';
  amount = '';
  constructor(private dataService: DataService) {}

  ngOnInit() {
    const initObject = {
      from: 'EUR',
      to: 'USD',
      amount: 1,
      result: 0,
    };

    this.dataService
      .convertCurrency(initObject)
      .subscribe((res) => (this.initRate = res.result));
  }

  convert(formData: any) {
    this.from = formData.from;
    this.amount = formData.amount;
    this.dataService
      .convertCurrency(formData)
      .subscribe((res) => (this.rateResult = res));
    this.dataService
      .convertCurrencies(this.from, this.supportedCurrencies)
      .subscribe((res) => {
        for (const key in res.quotes) {
          let newKey = key.substring(3);
          this.cardObject = {
            ...this.cardObject,
            [newKey]: res.quotes[key] * formData.amount,
          };
        }
      });
  }
}
