import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainDisplayComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() { }

}
