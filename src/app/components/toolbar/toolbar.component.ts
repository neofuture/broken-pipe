import {Component, Input, OnInit} from '@angular/core';
import {WindowModel} from '../../models/window-model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() windowList: WindowModel;

  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

  makeWindowActive(windowItem: WindowModel) {
    let zIndex = 0;
    // tslint:disable-next-line:forin
    for (const key in this.windowList) {
      if(this.windowList[key].zIndex > zIndex) {
        zIndex = this.windowList[key].zIndex;
      }
      this.windowList[key].state.active = false;
      this.windowList[key].class = 'open ' +
        (this.windowList[key].state.isMaximised ? ' maximised' : '') +
        (this.windowList[key].state.isMinimised ? ' minimised' : '');
    }
    zIndex++;
    windowItem.zIndex = zIndex;
    windowItem.state.active = true;
    windowItem.class = 'open active' +
      (windowItem.state.isMaximised ? ' maximised' : '') +
      (windowItem.state.isMinimised ? ' minimised' : '');
  }

  maximiseWindow(event: MouseEvent, windowItem: WindowModel) {
    windowItem.state.isMaximised = !windowItem.state.isMaximised;
  }
}
