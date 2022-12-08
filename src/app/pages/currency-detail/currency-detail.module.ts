import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyDetailComponent } from './currency-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgApexchartsModule } from 'ng-apexcharts';

export const routes = [
  {
    path: '',
    component: CurrencyDetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    NgApexchartsModule,
  ],
  declarations: [CurrencyDetailComponent],
})
export class CurrencyDetailModule {}
