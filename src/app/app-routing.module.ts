import { AuthentGuard } from './shared/guard/authent.guard';
import { SignInComponent } from './sign-in/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { MinitelComponent } from './minitel/minitel.component';
import { KonamiModule } from 'ngx-konami';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'authenticated', component: AuthenticatedComponent, canActivate: [AuthentGuard]},
  { path: 'home', component: MinitelComponent},
  { path: 'signup', component: SignUpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'signin' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
