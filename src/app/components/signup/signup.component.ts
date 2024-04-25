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
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [AuthenticationService],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm!: FormGroup;
  submitted = false;
  common = '';
  registered = false;
  wrongPassword = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const { email, password, userName, confirmPassword } =
        this.signupForm.value;
      console.log(email, password, userName, confirmPassword);
      if (password === confirmPassword) {
        const username = userName;
        this.authenticationService
          .userSignUp({ email, password, username })
          .subscribe({
            next: (data) => {
              if (data.status == '200') {
                console.log('Successss');
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 2000);
                this.submitted = false;
                this.registered = true;
              }
            },
            error: (error) => {
              this.common = error.message;
              console.log(this.common);
              setTimeout(() => {
                this.common = '';
              }, 2000);
              this.submitted = false;
            },
          });
      } else {
        this.common = 'Passwords do not match';
        setTimeout(() => {
          this.common = '';
        }, 2000);
        this.submitted = false;
      }
    }
  }
}
