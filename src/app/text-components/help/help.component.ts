import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['../../app.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
