import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  MonacoEditorConstructionOptions,
  MonacoStandaloneCodeEditor,
} from '@materia-ui/ngx-monaco-editor';

import { BehaviorSubject, Subject, debounceTime } from 'rxjs';
import Split from 'split-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  // Default theme
  Theme: string = 'vs-dark';
  VisualStudioThemes: string[] = ['vs-dark', 'vs-light', 'hc-black'];

  // CSS default values
  cssDefault = `
*{
  box-sizing: border-box;
}
    
html, body{
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
    `;

  // Input values
  private inputChange$ = new Subject<any>();
  importsPackage: string = '';

  InputValues = {
    HTMLCode: `<!-- Start coding here! --> \n`,
    CSSCode: `/* CSS default values */ \n${this.cssDefault}`,
    JSCode: `// Write your code here!${this.importsPackage}\n`,
  };

  AllInputValues!: string;

  // Iframe element
  @ViewChild('iframe') iframe!: ElementRef;

  // Editor options
  editorConstructor(languageoption: string): MonacoEditorConstructionOptions {
    return {
      theme: this.Theme,
      language: languageoption,
      tabSize: 2,
      minimap: {
        enabled: false,
      },
      padding: {
        top: 15,
      },
      wordWrap: 'wordWrapColumn',
      acceptSuggestionOnCommitCharacter: true,
      fontSize: 14,
    };
  }

  // Update iframe function
  Update() {
    // Default values
    this.AllInputValues = `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>${this.InputValues.CSSCode}</style>
        <script type="module">
        ${this.InputValues.JSCode}
        </script>
      </head>
      
      <body>
        ${this.InputValues.HTMLCode}
      </body>
      </html>
    `;

    this.iframe.nativeElement.srcdoc = this.AllInputValues;
  }

  ngOnInit(): void {
    // Quick access keys
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.altKey == true && e.key == '1') {
        this.state = 'html';
      } else if (e.altKey == true && e.key == '2') {
        this.state = 'css';
      } else if (e.altKey == true && e.key == '3') {
        this.state = 'js';
      }
    });

    Split({
      columnGutters: [
        {
          track: 1,
          element: document.querySelector('.gutter-col-1')!,
        },
      ],
    });
  }

  ngAfterViewInit(): void {
    this.inputChange$
      .pipe(debounceTime(430)) // Wait 450ms after last event
      .subscribe(() => {
        // Save Code to LocalStorage
        window.localStorage.setItem('code', JSON.stringify(this.InputValues));
        this.Update();
      });

    // Get code from LocalStorage
    if (window.localStorage.getItem('code')) {
      this.InputValues = JSON.parse(window.localStorage.getItem('code')!);
      this.Update();
    }
  }

  // Getting changes from the editor
  InitEditor(editor: MonacoStandaloneCodeEditor): void {
    editor.onDidChangeModelContent(() => {
      this.inputChange$.next('');
    });
  }

  // HTML, CSS, JS states
  state: string = 'html';
  setState(newState: string): void {
    this.state = newState;
  }

  // Show menu extensions
  showExtensions: boolean = false;
  toggleExtensions(): void {
    this.showExtensions = !this.showExtensions;
  }

  // Show theme list
  ShowThemeList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  ThemeListFunction(): void {
    this.ShowThemeList.next(!this.ShowThemeList.value);
  }

  ThemeSelected(theme: string): void {
    this.Theme = theme;
  }

  SeletedPackage(urlPackage: any) {
    this.state = 'js';
    this.InputValues.JSCode = `import ${urlPackage.name} from '${urlPackage.cdn}'; \n\n${this.InputValues.JSCode}`;
    this.Update();
  }

  CopyCode(code: string){
    console.log(code)
  }
}
