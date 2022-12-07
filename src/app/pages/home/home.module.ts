import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export const routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
