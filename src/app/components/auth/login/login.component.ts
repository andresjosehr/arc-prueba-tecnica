import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { password } from 'src/app/form-validators/password.validator';
import { user } from 'src/app/form-validators/user.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  hidePassword = true;
  loginFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.loginFormGroup = this.formBuilder.group({
      user: ['', [Validators.required, user()]],
      password: ['', [Validators.required, password()]],
      remember: [false],
      privacyPolicies: [false, Validators.requiredTrue],
    })
  }

  submitForm(){
    if(this.loginFormGroup.invalid){
      this.loginFormGroup.markAllAsTouched();
      this.loginFormGroup.get("privacyPolicies")?.markAsDirty()
      return;
    }

    this.router.navigateByUrl('players-list');

  }

}