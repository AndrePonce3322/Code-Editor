import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'code-editor';
  state: string = 'html';

  @ViewChild('HTML', { static: false }) HtmlEditor!: ElementRef;
  @ViewChild('CSS', { static: true }) CSSEditor!: ElementRef;
  @ViewChild('JS', { static: true }) JsEditor!: ElementRef;

  constructor() {

  }

  setState(newState: string) {
    this.state = newState;
  }
}
