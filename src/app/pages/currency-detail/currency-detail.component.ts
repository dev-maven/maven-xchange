import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CURRENCIES } from 'src/app/core/data/currencies';
import { ConvertedCurrency } from 'src/app/core/models/converted-currency';
import { DataService } from 'src/app/core/services/data.service';
import { ConversionForm } from '../../core/models/conversion-form';

import * as m from 'moment';
import { ChartData } from '../../core/data/chart-data';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ChartComponent,
  ApexTheme,
  ApexMarkers,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
};

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  rateResult: ConvertedCurrency;
  supportedCurrencies = CURRENCIES;
  initRate = 0;
  chartArray: ChartData[] = [];
  defaultObject: ConversionForm;
  chartDates: string[] = [];
  from = '';
  to = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const routeData = history.state;
    if (routeData) this.rateResult = routeData['currencyResult'];
    if (!this.rateResult) {
      const route = this.route.snapshot.paramMap;
      this.from = route.get('from').toUpperCase();
      this.to = route.get('to').toUpperCase();
      this.defaultObject = {
        from: this.from,
        to: this.to,
        amount: 1,
        result: 0,
      };

      this.dataService.convertCurrency(this.defaultObject).subscribe((res) => {
        this.initRate = res.info.quote;
      });
    } else {
      this.from = this.rateResult.query.from;
      this.to = this.rateResult.query.to;
    }

    this.loadChartData();
  }

  loadChartData() {
    this.chartDates = this.getDates();
    this.chartDates.forEach((date) => {
      this.dataService.history(this.from, this.to, date).subscribe((res) => {
        const key = this.from.toUpperCase() + this.to.toUpperCase();
        const obj = {
          month: m(date).format('MMM'),
          year: m(date).format('YYYY'),
          rate: res.quotes[key],
        };
        this.chartArray.push(obj);
        const allMonths = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        this.chartArray.sort(function (a, b) {
          return allMonths.indexOf(a.month) - allMonths.indexOf(b.month);
        });
        this.chartArray.sort(function (a, b) {
          return +a.year - +b.year;
        });

        const dataset = this.chartArray.map((item) => item.rate);

        const chartLabel = this.chartArray.map(
          (item) => item.month + "  ' " + item.year.substring(2)
        );

        this.plotChart(chartLabel, dataset);
      });
    });
  }

  plotChart(chartLabel: string[], dataset: number[]) {
    this.chartOptions = {
      series: [
        {
          name: 'Exchange Rate',
          data: dataset,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      theme: {
        mode: 'dark',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#0275d8',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Historical Rates Chart',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#4b4a49', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: chartLabel,
      },
    };
  }

  getDates(): string[] {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const startDate = m(
      `${currentYear - 1}-${currentMonth}-${this.getDaysInMonth(
        currentYear,
        currentMonth,
        'first'
      )}`,
      'YYYY-MM-D'
    );
    const endDate = m(
      `${currentYear}-${currentMonth}-${this.getDaysInMonth(
        currentYear,
        currentMonth,
        'first'
      )}`,
      'YYYY-MM-D'
    );
    const dates = [];
    let month = m(startDate);
    while (month < endDate) {
      month.add(1, 'month');
      dates.push(month.format('YYYY-MM-DD'));
    }
    const chartDates: string[] = [];
    dates.forEach((date) => {
      const tempDate = date.split('-');
      const tempYear = tempDate[0];
      const tempMonth = tempDate[1];
      const lastDay = this.getDaysInMonth(+tempYear, +tempMonth, 'last');
      const day = `${tempYear}-${tempMonth}-${lastDay}`;
      chartDates.push(day);
    });
    return chartDates;
  }

  getDaysInMonth(year: number, month: number, option: string) {
    if (option === 'first') {
      return new Date(year, month, 1).getDate();
    } else {
      return new Date(year, month, 0).getDate();
    }
  }

  convert(formData: any) {
    this.dataService.convertCurrency(formData).subscribe((res) => {
      this.rateResult = res;
      this.from = formData.from;
      this.to = formData.to;
      this.loadChartData();
    });
  }

  goHome() {
    this.router.navigateByUrl('/', {
      state: { currencyResult: this.rateResult },
    });
  }
}
