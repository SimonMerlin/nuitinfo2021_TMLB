import { Injectable } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { BehaviorSubject } from 'rxjs';
import { ThemeMode } from '../models/theme-mode.enum';

@Injectable({
  providedIn: 'root'
})
export class UiToggleService {

  private readonly THEME_KEY: string = 'THEME';
  private readonly DARK_THEME_VALUE: string = 'DARK';
  private readonly LIGHT_THEME_VALUE: string = 'LIGHT';
  private readonly DARK_THEME_CLASS_NAME: string = 'theme-dark';

  private darkThemeSelected: boolean = false;
  theme$ = new BehaviorSubject<ThemeMode>(ThemeMode.LIGHT);

  constructor() { }

  /**
   * Set theme on application start
   */
  setThemeOnStart(): void {
    if (this.isDarkThemeSelected()) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  /**
   * Change theme mode
   */
  toggle(): void {

  }

  /**
   * Set darkThemeSelected according to localStorage saved value
   * @returns true if dark theme is selected, else false
   */
  private isDarkThemeSelected(): boolean {
    this.darkThemeSelected = localStorage.getItem(this.THEME_KEY) === this.DARK_THEME_VALUE;
    return this.darkThemeSelected;
  }

  /**
   * Set light theme in lcoal storage
   */
  private setLightTheme(): void {
    localStorage.setItem(this.THEME_KEY, this.LIGHT_THEME_VALUE);
    document.body.classList.remove(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = false;
    this.theme$.next(ThemeMode.LIGHT);
  }

  /**
   * Set dark theme in local storage
   */
  private setDarkTheme(): void {
    localStorage.setItem(this.THEME_KEY, this.DARK_THEME_VALUE);
    document.body.classList.add(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = true;
    this.theme$.next(ThemeMode.DARK);
  }
}