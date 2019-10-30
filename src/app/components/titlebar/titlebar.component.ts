import {Component, OnInit} from '@angular/core';
import {WindowService} from '../../services/window.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor(private windowService: WindowService) {
  }

  ngOnInit() {
    this.windowService.addWindow('Test Window 1');
    this.windowService.addWindow('Test Window 2');
    this.windowService.addWindow('Test Window 3');
    this.windowService.addWindow('Test Window 4');
    this.windowService.addWindow('Test Window 5');
  }

  toggleBlocky() {
    if (document.body.classList.contains('blocky')) {
      document.body.classList.remove('blocky');
    } else {
      document.body.classList.add('blocky');
    }
  }

  addWindow(title: string) {
    this.windowService.addWindow(title);
  }

  logIt() {
    console.log(this.windowService.windowList);
  }

  closeWindowById(id: number) {
    this.windowService.closeWindowById(id);
  }

  closeAllWindows() {
    this.windowService.closeAllWindows();
  }
}
