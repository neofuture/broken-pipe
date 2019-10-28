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
    // event.stopPropagation();
    this.zIndex ++;
    // tslint:disable-next-line:forin
    for (const key in this.windowList) {
      if (this.windowList[key] === windowItem) {
        this.windowList[key].active = true;
        this.windowList[key].zIndex = this.zIndex;
        this.windowList[key].class = 'open active';
      } else {
        this.windowList[key].active = false;
        this.windowList[key].class = 'open';

      }
    }
  }
}
