import {Component, OnInit} from '@angular/core';
import {WindowModel} from '../../models/window-model';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  windowList = {};
  objectKeys = Object.keys;

  constructor() {
  }

  ngOnInit() {
    this.buildWindows();
  }

  buildWindows() {
    this.addWindow('Init test window');
    this.addWindow('Init test window');
    this.addWindow('Init test window');
    this.addWindow('Init test window');
    this.addWindow('Init test window');
  }

  onClose(windowItem: WindowModel) {
    for (const key in this.windowList) {
      if (windowItem === this.windowList[key]) {
        // setTimeout(() => {
        //   delete this.windowList[key];
        //   }, 1000);
        this.windowList[key].class = 'closed';
      }
    }
  }

  onClosed(windowItem: WindowModel) {
    for (const key in this.windowList) {
      if (windowItem === this.windowList[key]) {
        delete this.windowList[key];
      }
    }
  }

  logIt() {
    console.log(this.windowList);
  }

  addWindow(title) {
    let id = 0;

    for (const key in this.windowList) {
      if (parseInt(key, 10) >= id) {
        id = parseInt(key, 10);
      }
    }
    id++;

    const windowItem: WindowModel = {
      titleBar: title + ' ' + id,
      class: 'closed'
    };

    this.windowList[id] = windowItem;
    setTimeout(() => {
      this.windowList[id].class = 'open';
    });
  }
}
