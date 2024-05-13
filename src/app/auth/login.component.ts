import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private http: HttpClient, private router : Router, private authService: AuthService){

  }

  form = this.fb.nonNullable.group({
    email : ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;


onSubmit(): void{
  const rawForm = this.form.getRawValue()
  this.authService.login(rawForm.email, rawForm.password).subscribe({
    next: () =>{
      this.router.navigate(['/']);
  },
  error: (error) => {
    this.errorMessage = error.code;
  }
});
  console.log("login");
}

// loginWithGoogle(): void {
//   this.authService.loginWithGoogle().subscribe({
//     next: (user) => {
//       // Handle successful Google login
//       this.router.navigate(['/']);
//     },
//     error: (error) => {
//       // Handle Google login error
//       console.error('Google login error:', error);
//     }
//   });
// }

}
