import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../search.service';

@Component({
  selector: 'app-sentiment-tab',
  templateUrl: './sentiment-tab.component.html',
  styleUrls: ['./sentiment-tab.component.css']
})
export class SentimentTabComponent implements OnInit {
  searchList = []
  savedList = []

  constructor(public searchService: SearchService) {}

  ngOnInit() {
    this.searchList = this.searchService.getSearches()
    this.savedList = this.searchService.getSaved()
  }

}
