import { LoginSignupService } from './shared/service/login-signup.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tmlb-ndi';

  constructor(private loginSignupService: LoginSignupService){
    this.isAuthenticated$ = this.loginSignupService.isAuthenticated$;
  }

  isAuthenticated$?: Observable<boolean>;

  logout(){
    this.loginSignupService.logout();
  }
}
