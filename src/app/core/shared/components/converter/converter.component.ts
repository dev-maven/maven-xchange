import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  arrow = faArrowsLeftRight;
  converterForm = this.fb.group({
    amount: [''],
    from: [''],
    to: [''],
    total: [''],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  switchCurrency() {}
}
