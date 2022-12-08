import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export const routes = [
  {
    path: '',
    component: DetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [DetailComponent],
})
export class DetailModule {}
