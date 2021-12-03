import { AuthentGuard } from './shared/guard/authent.guard';
import { SignInComponent } from './sign-in/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MinitelComponent } from './minitel/minitel.component';
import { OfflineGuard } from './shared/guard/offline.guard';

const routes: Routes = [
  { path: 'signin', component: SignInComponent, canActivate: [OfflineGuard]},
  { path: 'home', component: MinitelComponent, canActivate: [AuthentGuard]},
  { path: 'signup', component: SignUpComponent, canActivate: [OfflineGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
