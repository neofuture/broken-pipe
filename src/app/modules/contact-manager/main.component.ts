import {Component, Input, OnInit} from '@angular/core';
import {WindowService} from '../../services/window.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() windowItem: any;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
  }

  addWindow(id) {
    this.windowService.new(
      'orders',
      true,
      'Orders - ' + id,
      true,
      true,
      'quotes',
    {id}
    );
  }
}
