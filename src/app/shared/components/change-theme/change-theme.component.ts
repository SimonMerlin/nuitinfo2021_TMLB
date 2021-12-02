import { Component, OnInit } from '@angular/core';
import { ThemeMode } from '../../model/theme-mode.enum';
import { UiToggleService } from '../../service/ui-toggle.service';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss']
})
export class ChangeThemeComponent implements OnInit {

  theme: ThemeMode = ThemeMode.LIGHT;
  ThemeMode = ThemeMode;

  constructor(private themeService: UiToggleService) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((themeMode: ThemeMode) => {
      this.theme = themeMode;
    });
  }

  /**
   * Change theme
   */
  changeTheme(): void {
    this.themeService.toggle();
  }

}
