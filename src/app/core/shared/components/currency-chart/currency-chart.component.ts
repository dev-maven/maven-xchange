import { Component, Input, OnChanges, ViewChild } from '@angular/core';
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
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.scss'],
})
export class CurrencyChartComponent implements OnChanges {
  @Input() chartLabel: string[];
  @Input() dataSet: number[];
  @Input() from = '';
  @Input() to = '';
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {}

  ngOnChanges() {
    this.chartOptions = {
      series: [
        {
          name: 'Exchange Rate',
          data: this.dataSet,
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
        monochrome: {
          enabled: false,
          color: '#006466',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 8,
      },
      title: {
        text: `${this.from} - ${this.to}  Historical Rates Chart`,
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#4b4a49', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: this.chartLabel,
      },
    };
  }
}
