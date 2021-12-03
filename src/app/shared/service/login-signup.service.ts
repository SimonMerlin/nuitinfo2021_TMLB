import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  fastify: any = null;

  constructor(private router: Router, private snackBar: MatSnackBar) {

    if(localStorage.getItem('logged')){
      this.isAuthenticated$.next(JSON.parse(localStorage.getItem('logged')!))
    }else{
      this.isAuthenticated$.next(false);
    }
    if(localStorage.getItem('user')){
      this.user$.next(JSON.parse(localStorage.getItem('user')!))
    }

  }

  key = 'users';

  isAuthenticated$ = new BehaviorSubject(false);
  user$: Subject<User> = new Subject();

  signUp(user: User): void{
    if(localStorage.getItem(this.key)){
      console.log("r")
      let users: User[] = JSON.parse(localStorage.getItem(this.key)!)
      if(users.some(u => u.username===user.username && u.password===user.password)){
        this.snackBar.open('Déjà enregistré', '', {duration: 2000});
        return;
      }
      users = users.concat(user);
      localStorage.setItem(this.key, JSON.stringify(users));
    }else{
      localStorage.setItem(this.key, JSON.stringify([user]));
    }
    this.router.navigate(['login'])
    this.snackBar.open('Inscription validée', '', {duration: 2000});
  }

  signin(user: User): boolean{
    if(localStorage.getItem(this.key)){
      let users: User[] = JSON.parse(localStorage.getItem(this.key)!);
      this.isAuthenticated$.next(true);
      let userFind = users.find(u => u.username===user.username && u.password===user.password);
      if(!!userFind){
        this.user$.next(userFind);
        localStorage.setItem('logged', 'true');
        localStorage.setItem('user', JSON.stringify(userFind));
        this.snackBar.open('Connecté', '', {duration: 2000});
        this.router.navigate(['home'])
        return true;
      }else{
        this.snackBar.open('Erreur de connection', '', {duration: 2000});
        return false;
      }
    }else{
      this.snackBar.open('Erreur de connection', '', {duration: 2000});
      return false;
    }
  }

  logout(): void{
    this.user$.next(undefined);
    this.isAuthenticated$.next(false);
    localStorage.setItem('logged', 'false');
    localStorage.removeItem('user');
    localStorage.removeItem('THEME');
    this.router.navigate(['login'])
    this.snackBar.open('Déconnexion', '', {duration: 2000});
  }
}
