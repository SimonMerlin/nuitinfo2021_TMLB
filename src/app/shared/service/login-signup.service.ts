import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  constructor(private router: Router, private snackBar: MatSnackBar) {
    if(localStorage.getItem('logged')){
      this.isAuthenticated$.next(JSON.parse(localStorage.getItem('logged')!))
    }else{
      this.isAuthenticated$.next(false);
    }
  }

  key = 'users';

  isAuthenticated$ = new BehaviorSubject(false);

  signUp(user: User): void{
    if(localStorage.getItem(this.key)){
      let users: User[] = JSON.parse(localStorage.getItem(this.key)!).concat(user);
      localStorage.setItem(this.key, JSON.stringify(users));
    }else{
      localStorage.setItem(this.key, JSON.stringify([user]));
    }
    this.router.navigate(['login'])
    this.snackBar.open('signup success', '', {duration: 2000});
  }

  signin(user: User): boolean{
    if(localStorage.getItem(this.key)){
      let users: User[] = JSON.parse(localStorage.getItem(this.key)!);
      this.isAuthenticated$.next(true);
      let ok = users.some(u => u.username===user.username && u.password===user.password);
      if(ok){
        localStorage.setItem('logged', 'true');
        this.snackBar.open('signin success', '', {duration: 2000});
        this.router.navigate(['authenticated'])
        return true;
      }else{
        this.snackBar.open('signin failed', '', {duration: 2000});
        return false;
      }
    }else{
      this.snackBar.open('signin failed', '', {duration: 2000});
      return false;
    }
  }

  logout(): void{
    this.isAuthenticated$.next(false);
    localStorage.setItem('logged', 'false');
    this.router.navigate(['login'])
    this.snackBar.open('logout success', '', {duration: 2000});
  }
}
