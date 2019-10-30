import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {WindowModel} from '../../models/window-model';
import {WindowService} from '../../services/window.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  resizeDirection: any;
  innerWidth: number;
  innerHeight: number;

  resizeWindowItem: any = null;
  dragWindowItem: any = null;
  windowList: object;

  @Input() titleBarTopHeight: number;
  @Input() toolbarHeight: number;

  @Input() windowItem: WindowModel;

  @Output() closing = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    if (this.resizeWindowItem !== null) {
      this.resizeDragGo(event);
    }
    if (this.dragWindowItem !== null) {
      this.dragGo(event);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.resizeWindowItem !== null) {
      this.resizeDragStop();
    }
    if (this.dragWindowItem !== null) {
      this.dragStop();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.resize();
  }

  constructor(private windowService: WindowService) {
  }

  ngOnInit() {
    this.resize();
    this.windowList = this.windowService.windowList;
  }

  resize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
  closeWindow(event, windowItem) {
    event.stopPropagation();
    windowItem.closing = true;
    this.closing.emit(windowItem);
  }

  closedWindow(windowItem) {
    if (windowItem.class === 'closed') {
      this.closed.emit(windowItem);
    }
  }

  resizeCursorSet(event, windowItem) {
    // @ts-ignore
    if (!event.target.classList.contains('windowItem') || windowItem.resizable === false) {
      return false;
    }

    if (
      this.resizeWindowItem === null
    ) {
      const xOff = event.offsetX;
      const yOff = event.offsetY;
      const resizeCornerSize = 100;
      this.resizeDirection = '';

      if (yOff <= resizeCornerSize) {
        this.resizeDirection += 'n';
      } else {
        if (yOff >= event.target.offsetHeight - resizeCornerSize) {
          this.resizeDirection += 's';
        }
      }

      if (xOff <= resizeCornerSize) {
        this.resizeDirection += 'w';
      } else {
        if (xOff >= event.target.offsetWidth - resizeCornerSize) {
          this.resizeDirection += 'e';
        }
      }

      document.body.style.cursor = this.resizeDirection + '-resize';
    } else {
      this.resizeCursorRestore();
    }
  }

  resizeCursorRestore() {
    document.body.style.cursor = '';
  }

  resizeDragStart(event, windowItem: WindowModel) {
    if (!event.target.classList.contains('windowItem')) {
      return false;
    }
    this.resizeWindowItem = windowItem;
    this.makeWindowActive(this.resizeWindowItem);

    this.resizeWindowItem.entities.xPosition = event.x || event.pageX;
    this.resizeWindowItem.entities.yPosition = event.y || event.pageY;

    this.resizeWindowItem.entities.left = parseInt(this.resizeWindowItem.left, 10);
    this.resizeWindowItem.entities.top = parseInt(this.resizeWindowItem.top, 10);
    this.resizeWindowItem.entities.width = parseInt(this.resizeWindowItem.width, 10);
    this.resizeWindowItem.entities.height = parseInt(this.resizeWindowItem.height, 10);

  }

  resizeDragGo(event) {
    if (this.resizeWindowItem !== null) {

      let north = false;
      let south = false;
      let east = false;
      let west = false;
      if (this.resizeDirection.charAt(0) === 'n') {
        north = true;
      }
      if (this.resizeDirection.charAt(0) === 's') {
        south = true;
      }
      if (this.resizeDirection.charAt(0) === 'e' || this.resizeDirection.charAt(1) === 'e') {
        east = true;
      }
      if (this.resizeDirection.charAt(0) === 'w' || this.resizeDirection.charAt(1) === 'w') {
        west = true;
      }

      let x = event.pageX;
      let y = event.pageY;

      if (x <= 5) {
        x = 5;
      }

      if (x >= this.innerWidth - 5) {
        x = this.innerWidth - 5;
      }

      if (y <= this.titleBarTopHeight) {
        y = this.titleBarTopHeight;
      }

      if (y >= this.innerHeight - this.toolbarHeight - 6) {
        y = this.innerHeight - this.toolbarHeight - 6;
      }

      let dx = x - this.resizeWindowItem.entities.xPosition;
      let dy = y - this.resizeWindowItem.entities.yPosition;

      if (west) {
        dx = -dx;
      }
      if (north) {
        dy = -dy;
      }

      let w = this.resizeWindowItem.entities.width + dx;
      let h = this.resizeWindowItem.entities.height + dy;
      if (w <= this.resizeWindowItem.minimumWidth) {
        w = this.resizeWindowItem.minimumWidth;
        dx = w - this.resizeWindowItem.entities.width;
      }
      if (h <= this.resizeWindowItem.minimumHeight) {
        h = this.resizeWindowItem.minimumHeight;
        dy = h - this.resizeWindowItem.entities.height;
      }

      if (north || east || south || west) {
        this.resizeWindowItem.class = 'open active noTransition';
      }

      if (east || west) {
        this.resizeWindowItem.width = w;
      }
      if (north || south) {
        this.resizeWindowItem.height = h;
      }

      if (west) {
        this.resizeWindowItem.left = (this.resizeWindowItem.entities.left - dx);
      }
      if (north) {
        this.resizeWindowItem.top = (this.resizeWindowItem.entities.top - dy);
      }
    }
  }

  resizeDragStop() {
    if (this.resizeWindowItem !== null) {
      this.resizeWindowItem.entities = {};
      this.resizeWindowItem = null;
    }
    document.body.style.cursor = '';
  }

  makeWindowActive(windowItem: WindowModel) {
    this.windowService.makeWindowActive(windowItem);
  }

  maximiseWindow($event: MouseEvent, windowItem: WindowModel) {
    this.windowService.maximiseWindow(windowItem);
  }

  minimiseWindow(event: MouseEvent, windowItem: WindowModel) {
    this.windowService.minimiseWindow(event, windowItem);
  }

  dragStart(event, windowItem: WindowModel) {
    if (!event.target.classList.contains('titleBar')) {
      return false;
    }
    this.dragWindowItem = windowItem;
    this.makeWindowActive(this.dragWindowItem);

    const x = event.pageX;
    const y = event.pageY;

    this.dragWindowItem.entities.xOffset = event.target.parentNode.offsetLeft - x;
    this.dragWindowItem.entities.yOffset = event.target.parentNode.offsetTop - y;
    this.dragWindowItem.class = 'open active noTransition';

  }

  dragGo(event) {
    if (this.dragWindowItem !== null) {
      const x = event.pageX;
      const y = event.pageY;

      let xOff = (x + this.dragWindowItem.entities.xOffset);
      let yOff = (y + this.dragWindowItem.entities.yOffset);

      if (yOff <= 1) {
        yOff = 1;
      }

      if (yOff > this.innerHeight - ((this.toolbarHeight * 2) + this.titleBarTopHeight)) {
        yOff = this.innerHeight - ((this.toolbarHeight * 2) + this.titleBarTopHeight);
      }

      if (xOff + this.dragWindowItem.width - 60 < 0) {
        xOff = 0 - this.dragWindowItem.width + 60;
      }

      if (xOff + 35 > this.innerWidth) {
        xOff = this.innerWidth - 35;
      }

      this.dragWindowItem.left = xOff;
      this.dragWindowItem.top = yOff;

    }
  }

  dragStop() {
    if (this.dragWindowItem !== null) {
      this.dragWindowItem.entities = {};
      this.dragWindowItem = null;
    }
  }
}
