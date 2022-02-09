import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; //Angular likes HTTP client instead of async/fetch
import { NgForm } from '@angular/forms';

import { Search } from '../search.model';

@Component({
  selector: 'app-side-search',
  templateUrl: './side-search.component.html',
  styleUrls: []
})
export class SideSearchComponent implements OnInit {
  searches = [];
  isSubmitted = false;
  isLoading = false;
  newSearch = '';
  userValue = '';
  returnStonkData = {};

  // variable collection from Search feature
  searchID = null;
  userSearch = '';
  tickerLow = null;
  tickerHigh = null;
  @Output() searchCreated = new EventEmitter();

  constructor(private router: ActivatedRoute) { }

  ngOnInit() { }

  onAddSearch(form: NgForm) {
    this.isSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.newSearch = form.value.search.toUpperCase(); //new variable name
    // const pythonURL = `http://localhost:5000/getPriceData?symbol=${this.newSearch}`
    // fetch(pythonURL).then(
    //   res => res.json()
    // ).then(
    //   data => {
    //     this.returnStonkData = data
    //     console.log(this.returnStonkData)
    //     //outputs API Data as the empty object returnStonkData
    //   }
    // )

    const search: Search = {
      //I want to pull the most recent API data into this model
      id: this.searchID,
      description: this.userSearch,
      ticker: this.newSearch,
      low: this.tickerLow,
      high: this.tickerHigh
    };

    //And then push it into the array below, so I can output
    //   the array in the "Recent Searches" panel.
    this.searches.push(search);
    this.searchCreated.emit(search);
    // console.log("side-search emit: ")
    // console.log(this.searches)



    //Figure out a way to log returnStonkData outside of the scope of the API call.
    //May need an observable - one of the bigger hurdles

  }

}
