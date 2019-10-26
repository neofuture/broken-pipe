import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WindowModel} from '../../models/window-model';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  @Input() windowItem: WindowModel;
  @Output() close = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  closeWindow(windowItem) {
    windowItem.close = true;
    this.close.emit(windowItem);
  }

  closedWindow(windowItem) {
    if (windowItem.close) {
      this.closed.emit(windowItem);
    }
  }
}
