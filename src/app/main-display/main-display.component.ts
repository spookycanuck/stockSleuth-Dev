import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; //Angular likes HTTP client instead of async/fetch
import { SearchService } from './search.service';

import { Search } from './search.model';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainDisplayComponent implements OnInit {
  storedSearches = [];

  constructor(private router: ActivatedRoute) { }

  ngOnInit() { }

  onSearchAdded(search) {
    this.storedSearches.push(search); //adds search to "searched" array
    // console.log("main-display: ")
    // console.log(this.storedSearches)
  }

}
