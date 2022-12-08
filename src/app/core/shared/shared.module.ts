import { CurrencyChartComponent } from './components/currency-chart/currency-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DataService } from '../services/data.service';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TooltipDirective } from '../directives/tooltip.directive';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgApexchartsModule,
  ],
  declarations: [
    HeaderComponent,
    CurrencyConverterComponent,
    CurrencyCardComponent,
    CurrencyChartComponent,
    TooltipDirective,
  ],
  exports: [
    HeaderComponent,
    CurrencyConverterComponent,
    FontAwesomeModule,
    CurrencyCardComponent,
    CurrencyChartComponent,
    TooltipDirective,
  ],
  providers: [DataService],
})
export class SharedModule {}
