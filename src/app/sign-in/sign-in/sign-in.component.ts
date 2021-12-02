import { LoginSignupService } from './../../shared/service/login-signup.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if(this.form.valid){
      this.loginSignupService.signin({username: this.form.get('username')?.value, password: this.form.get('password')?.value})
    }
  }

  constructor(private loginSignupService: LoginSignupService) { }

  ngOnInit(): void {
  }

}
