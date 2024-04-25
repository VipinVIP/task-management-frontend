import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  common = '';
  errorLogin = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authenticationService.userLogin({ email, password }).subscribe({
        next: (data) => {
          if (data.status == '200') {
            localStorage.setItem('access_token', data.token);
            this.router.navigate(['/']);
            console.log('access_token', data.token);
            console.log(data);
          }
        },
        error: (error) => {
          this.common = error.message;
          console.log(error.message);
          setTimeout(() => {
            this.common = '';
          }, 2000);
        },
      });
    }
  }
}
