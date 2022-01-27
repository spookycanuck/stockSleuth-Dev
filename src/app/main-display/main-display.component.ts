import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; //Angular likes HTTP client instead of async/fetch
import { SearchService } from './search.service';

import { searches } from './search.model';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainDisplayComponent implements OnInit {
  searches = searches;
  isLoading = false;
  newSearch = '';
  userValue = '';
  returnStonkData = {};

  constructor(private router: ActivatedRoute) { }

  ngOnInit() { }

  onAddSearch(userInput: HTMLTextAreaElement) {
    this.newSearch = userInput.value; //new variable name
    console.log(this.newSearch);

    const pythonURL = `http://localhost:5000/getPriceData?symbol=${this.newSearch}`
    fetch(pythonURL).then(
      res => res.json()
    ).then(
      data => {
        this.returnStonkData = data
        console.log(this.returnStonkData) //outputs API Data as the empty object returnStonkData
      }
    )

    //Figure out a way to log returnStonkData outside of the scope of the API call.
    //May need an observable - one of the bigger hurdles

  }
}
