import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../app.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
