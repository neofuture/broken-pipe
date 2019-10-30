import {Component, OnInit} from '@angular/core';
import {WindowService} from '../../services/window.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitleBarComponent implements OnInit {
  hasTitleBar = true;
  title = 'Test Window';
  hasTab = true;
  resizable = true;

  constructor(private windowService: WindowService) {
  }

  ngOnInit() {
    this.windowService.new(true, 'No Tab', false, true);
    this.windowService.new(true, 'Not Resizable', true, false);
    this.windowService.new(false, 'No Title Bar', true, true);
    this.windowService.new(true, 'Test Window 4', true, true);
    this.windowService.new(true, 'Test Window 5', true, true);
  }

  toggleBlocky() {
    document.body.classList.add('noTransition');
    document.body.classList.contains('blocky') ? document.body.classList.remove('blocky') : document.body.classList.add('blocky');
    setTimeout(() => {
      document.body.classList.remove('noTransition');
    });
  }

  addWindow() {
    this.windowService.new(
      JSON.parse(String(this.hasTitleBar)),
      this.title,
      JSON.parse(String(this.hasTab)),
      JSON.parse(String(this.resizable))
    );
  }

  closeAllWindows() {
    this.windowService.closeAll();
  }
}
