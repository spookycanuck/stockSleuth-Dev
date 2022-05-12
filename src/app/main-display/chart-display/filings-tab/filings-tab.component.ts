import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { dataList } from './data';

@Component({
  selector: 'app-filings-tab',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './filings-tab.component.html',
  styleUrls: ['./filings-tab.component.css']
})
export class FilingsTabComponent implements OnInit {
  dates = new FormControl();
  dateList: string[] = ['2022','2021','2020','2019','2018','2017','2016', '2015'];
  dataList: string[] = dataList

  constructor() { }

  ngOnInit(): void {
  }

}
