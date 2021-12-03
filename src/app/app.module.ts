import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignInComponent } from './sign-in/sign-in/sign-in.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { UiToggleService } from './shared/service/ui-toggle.service';
import { ChangeThemeComponent } from './shared/components/change-theme/change-theme.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MinitelComponent } from './minitel/minitel.component';
import { KonamiModule } from 'ngx-konami';



export function themeFactory(themeService: UiToggleService) {
  return () => themeService.setThemeOnStart();
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AuthenticatedComponent,
    ChangeThemeComponent,
    MinitelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    KonamiModule
  ],
  providers: [
    UiToggleService,
    { provide: APP_INITIALIZER, useFactory: themeFactory, deps: [UiToggleService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
