import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);
  
  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }
  }
  
  toggleTheme() {
    if (this.isDarkMode()) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }
  
  private enableDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    this.isDarkMode.set(true);
  }
  
  private disableDarkMode() {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    this.isDarkMode.set(false);
  }
}