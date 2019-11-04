import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MainComponent } from './main.component';
import {JsonPipe} from '../../pipes/json.pipe';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule
  ]
})
export class ContactManagerModule { }
