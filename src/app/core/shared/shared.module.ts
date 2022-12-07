import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MoviesService } from '../services/movies.service';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConverterComponent } from './components/converter/converter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  declarations: [HeaderComponent, ConverterComponent, CurrencyCardComponent],
  exports: [
    HeaderComponent,
    ConverterComponent,
    FontAwesomeModule,
    CurrencyCardComponent,
  ],
  providers: [MoviesService],
})
export class SharedModule {}
