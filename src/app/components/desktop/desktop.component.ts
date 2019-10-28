import {Component, HostListener, OnInit} from '@angular/core';
import {WindowModel} from '../../models/window-model';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  windowList = {};
  objectKeys = Object.keys;
  top = 100;
  left = 10;
  width = 600;
  height = 200;
  active = false;
  zIndex = 1;
  innerWidth: number;
  innerHeight: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor() {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
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
        this.windowList[key].class = 'closed';
      }
    }
  }

  onClosed(windowItem: WindowModel) {
    let lastWindow: WindowModel;
    for (const key in this.windowList) {
      if (windowItem === this.windowList[key]) {
        delete this.windowList[key];
      } else {
        lastWindow = this.windowList[key];
      }
    }
    this.makeWindowActive(lastWindow);
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

    const height = this.randomIntFromInterval(200, 400);
    const width = this.randomIntFromInterval(400, 800);

    const position = this.findXYPosition(height, width);

    let windowItem: WindowModel;
    windowItem = {
      titleBar: title + ' ' + id,
      body: 'testing',
      class: 'new',
      zIndex: this.zIndex,
      active: this.active,
      top: position.top,
      left: position.left,
      width,
      height,
      close: false,
      closed: false
    };

    this.windowList[id] = windowItem;
    setTimeout(() => {
      this.windowList[id].class = 'open';
      this.makeWindowActive(windowItem);
    });

    this.zIndex += 1;
  }

  findXYPosition(height, width) {
    const grid = 30;
    let rows = 0;

    for (let left = 0; (left + width) < this.innerWidth; left += grid) {
      for (let top = 100; (top + height) < this.innerHeight; top += grid) {

        if (!this.isWindowAtPosition(left, top)) {
          return {left, top};
        }

        if (left + grid + width > this.innerWidth) {
          left = 0;
          rows++;
          top = 100 + (rows * grid);
        } else {
          left += grid;
        }
      }
    }

  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  isWindowAtPosition(left, top) {
    for (const item in this.windowList) {
      if (this.windowList[item].left === left && this.windowList[item].top === top) {
        return true;
      }
    }
    return false;
  }

  closeWindowById(id: number) {
    if (typeof this.windowList[id] !== 'undefined') {
      this.windowList[id].class = 'closed';
    }
  }

  closeAllWindows() {
    // tslint:disable-next-line:forin
    for (const key in this.windowList) {
      this.windowList[key].class = 'closed';

    }
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
