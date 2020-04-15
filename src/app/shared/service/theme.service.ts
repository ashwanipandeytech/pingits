import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ThemeService {
  ThemeCollections = {
    'lightTheme': {
      'theme-color-1': '#3d4051',
      'theme-color-2': '#ced4d4',
      'theme-color-3': '#ffffff'
    },
    'darkTheme': {
      'theme-color-1': '#ced4d4',
      'theme-color-2': '#3d4051',
      'theme-color-3': '#3d4051'
    },
    'greenTheme': {
      'theme-color-1': '#ced4d4',
      'theme-color-2': '#3d4051',
      'theme-color-3': '#3d4051'
    },
    'redTheme': {
      'theme-color-1': '#ced4d4',
      'theme-color-2': '#3d4051',
      'theme-color-3': '#3d4051'
     }
  };
  toggleTheme(value) {
    console.info(value);
    this.setTheme(this.ThemeCollections[value]);
  }
   setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
