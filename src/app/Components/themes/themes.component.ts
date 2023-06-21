import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
})
export class ThemesComponent implements OnInit {
  @Input() ThemeList!: string[];
  @Input() showThemeList!: BehaviorSubject<boolean>;
  @Output() ThemeSelected = new EventEmitter<string>();

  SearchInput!: string;

  HiddeThemeList() {
    this.showThemeList.next(!this.showThemeList.value);
  }

  // Default theme
  LocalThemeSelected: string = 'vs-dark';

  SelectedTheme(theme: string) {
    this.ThemeSelected.emit(theme);
    this.LocalThemeSelected = theme;
    window.localStorage.setItem('Theme', theme);
  }

  ngOnInit(): void {
    const value = window.localStorage.getItem('Theme');
    if (window.localStorage.getItem('Theme')) {
      this.ThemeSelected.emit(value!);
    }
  }
}
