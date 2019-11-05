import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() {
  }

  @Input() data: any;

  id = 0;

  ngOnInit() {
    if (typeof this.data === 'undefined') {
      this.data = {};
      this.data.id = 0;
    }
  }

}
