import {Component, Input, OnInit} from '@angular/core';
import {WindowModel} from '../../models/window-model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() windowList: WindowModel;
  @Input() zIndex;

  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

  makeWindowActive(windowItem: WindowModel) {
    this.zIndex++;
    // tslint:disable-next-line:forin
    for (const key in this.windowList) {
      this.windowList[key].state.active = true;
      this.windowList[key].zIndex = this.zIndex;
      this.windowList[key].class = 'open ' +
        (this.windowList[key].state.isMaximised ? ' maximised' : '') +
        (this.windowList[key].state.isMinimised ? ' minimised' : '');
    }

    windowItem.state.active = false;
    windowItem.class = 'open active' +
      (windowItem.state.isMaximised ? ' maximised' : '') +
      (windowItem.state.isMinimised ? ' minimised' : '');

  }
}
