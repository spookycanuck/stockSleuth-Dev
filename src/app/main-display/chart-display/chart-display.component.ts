import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; //Angular likes HTTP client instead of async/fetch
import { SearchService } from '../search.service';

import { Search } from '../search.model';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: []
})
export class ChartDisplayComponent implements OnInit {
  @Input() searches = [];
  isLoading = false;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() { }

}