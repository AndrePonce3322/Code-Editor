import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MONACO_PATH, MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

import { AppComponent } from './app.component';
import { ExtensionsComponent } from './Components/extensions/extensions.component';
import { ThemesComponent } from './Components/themes/themes.component';
import { SearchPipe } from './Pipes/search.pipe';
import { AngularSplitModule } from 'angular-split';

import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    AngularSplitModule,
    HttpClientModule,
    MatTooltipModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.30.1/min/vs',
    },
  ],
  declarations: [
    AppComponent,
    ExtensionsComponent,
    ThemesComponent,
    SearchPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
