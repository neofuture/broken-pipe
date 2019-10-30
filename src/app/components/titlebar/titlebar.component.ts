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
    this.windowService.addWindow(true, 'No Tab', false, true);
    this.windowService.addWindow(true, 'Not Resizable', true, false);
    this.windowService.addWindow(false, 'Test Window 3', true, true);
    this.windowService.addWindow(true, 'Test Window 4', true, true);
    this.windowService.addWindow(true, 'Test Window 5', true, true);
  }

  toggleBlocky() {
    document.body.classList.add('noTransition');
    document.body.classList.contains('blocky') ? document.body.classList.remove('blocky') : document.body.classList.add('blocky');
    setTimeout(() => {
      document.body.classList.remove('noTransition');
    });
  }

  addWindow(title: string) {
    this.windowService.addWindow(true, title, true, true);
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
