import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private http: HttpClient, private router : Router, private authService: AuthService){

  }

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email : ['', Validators.required],
    password: ['', Validators.required],
    isAdmin: [false],
  });

  errorMessage: string | null = null;
onSubmit(): void{
  const rawForm = this.form.getRawValue()
  this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
    next: () =>{
    this.router.navigate(['login']);
  },
  error: (error) => {
    this.errorMessage = error.code;
  }
});
  console.log("register");
}
}
