import { Injectable } from '@angular/core';
import {WindowModel} from '../models/window-model';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windowList = {};
  constructor() { }

  addWindow(title) {
    let id = parseInt(Object.keys(this.windowList)[Object.keys(this.windowList).length - 1], 10) || 0;
    id ++;

    const height = this.randomIntFromInterval(200, 400);
    const width = this.randomIntFromInterval(400, 800);

    const position = this.findXYPosition(height, width);
    let zIndex = 0;
    // tslint:disable-next-line:forin
    for (const key in this.windowList) {
      if (this.windowList[key].zIndex > zIndex) {
        zIndex = this.windowList[key].zIndex;
      }
    }
    let windowItem: WindowModel;
    windowItem = {
      titleBar: title + ' ' + id,
      body: 'testing',
      class: 'new active',
      zIndex,
      top: position.top,
      left: position.left,
      height,
      width,
      minimumWidth: 300,
      minimumHeight: 200,
      maximizable: true,
      minimizable: true,
      resizable: true,
      closing: false,
      entities: {},
      state: {
        active: true,
        isMinimised: false,
        isMaximised: false
      }
    };

    this.windowList[id] = windowItem;
    setTimeout(() => {
      this.windowList[id].class = 'open';
      this.makeWindowActive(windowItem);
    });
  }

  findXYPosition(height, width) {
    const grid = 30;
    let rows = 0;

    for (let left = 0; (left + width) < window.innerWidth; left += grid) {
      for (let top = 100; (top + height) < window.innerHeight; top += grid) {

        if (!this.isWindowAtPosition(top, left)) {
          return {top, left};
        }

        if (left + grid + width > window.innerWidth) {
          left = 0;
          rows++;
          top = 100 + (rows * grid);
        } else {
          left += grid;
        }
      }
    }
    return {left: 100, top: 100};
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  isWindowAtPosition(top, left) {
    for (const item in this.windowList) {
      if (this.windowList[item].top === top && this.windowList[item].left === left) {
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
    for (const key in this.windowList) {
      if (typeof this.windowList[key] !== 'undefined') {
        this.windowList[key].class = 'closed';
      }
    }
  }

  makeWindowActive(windowItem: WindowModel) {
    let zIndex = 0;
    // tslint:disable-next-line:forin
    for (const key in this.windowList) {
      if (this.windowList[key].zIndex > zIndex) {
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
    windowItem.state.isMinimised = false;
    windowItem.class = 'open active' +
      (windowItem.state.isMaximised ? ' maximised' : '') +
      (windowItem.state.isMinimised ? ' minimised' : '');
  }

  makeWindowInactive(windowItem) {
    windowItem.state.active = false;
    windowItem.class = 'open ' +
      (windowItem.state.isMaximised ? ' maximised' : '') +
      (windowItem.state.isMinimised ? ' minimised' : '');
  }

  onClose(windowItem: WindowModel) {
    windowItem.class = 'closed';
  }

  onClosed(windowItem: WindowModel) {
    let lastWindow: WindowModel;
    let windowActive = false;
    for (const key in this.windowList) {
      if (windowItem === this.windowList[key]) {
        delete this.windowList[key];
      } else {
        lastWindow = this.windowList[key];
        if (lastWindow.state.active) {
          windowActive = true;
        }
      }
    }

    if (typeof lastWindow !== 'undefined') {
      if (lastWindow.class !== 'closed' && !windowActive) {
        this.makeWindowActive(lastWindow);
      }
    }
  }

  maximiseWindow(windowItem: WindowModel) {
    windowItem.state.isMaximised = !windowItem.state.isMaximised;
  }

  minimiseWindow(event: MouseEvent, windowItem: WindowModel) {
    event.stopPropagation();
    if (windowItem.state.isMinimised === false) {
      // @ts-ignore
      windowItem.entities.minimisedTop = windowItem.top;
    } else {
      windowItem.entities = {};
    }
    windowItem.state.isMinimised = !windowItem.state.isMinimised;
    this.makeWindowInactive(windowItem);
  }
}
