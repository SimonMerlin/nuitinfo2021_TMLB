import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSignupService } from '../service/login-signup.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentGuard implements CanActivate {

  constructor(private loginSignupService: LoginSignupService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginSignupService.isAuthenticated$.pipe(
      tap((authent)=> {
        if(!authent){
          this.router.navigateByUrl('login')
        }
      })
    );
  }

}
