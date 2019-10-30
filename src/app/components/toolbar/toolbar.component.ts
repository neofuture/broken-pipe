import {Component, OnInit} from '@angular/core';
import {WindowModel} from '../../models/window-model';
import {WindowService} from '../../services/window.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  windowList: {};

  objectKeys = Object.keys;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
    this.windowList = this.windowService.windowList;
  }

  makeWindowActive(windowItem: WindowModel) {
    this.windowService.active(windowItem);
  }

  maximiseWindow(event: MouseEvent, windowItem: WindowModel) {
    this.windowService.maximise(windowItem);
  }
}
