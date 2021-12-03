import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginSignupService } from '../shared/service/login-signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  constructor(private loginSignupService: LoginSignupService) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordVerif: new FormControl('', Validators.required),
  },
  {
    validators : [this.mustMatchPassword('password', 'passwordVerif')]
  } as AbstractControlOptions);

  submit() {
    if(this.form.valid){
      this.loginSignupService.signUp({username: this.form.get('username')?.value, password: this.form.get('password')?.value})
    }
  }

  mustMatchPassword(controlName: string, matchingControlName: string){
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const matchingControl = controls.get(matchingControlName);
      if(matchingControl.errors && !matchingControl.errors.mustMatch){
        return;
      }
      const hasError: boolean = control.value !== matchingControl.value;
      if(hasError){
        matchingControl.setErrors({mustMatch: true})
      }else{
        matchingControl.setErrors(null)
      }
    }
  }

}
