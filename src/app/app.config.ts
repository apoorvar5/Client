import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { authInterceptor } from './auth/auth.interceptor';


const firebaseConfig = {
  apiKey: "AIzaSyCS9gPAlAXGuxX9NpGCoqj25JJ56Stno0E",
  authDomain: "my-angular-app-f7e34.firebaseapp.com",
  projectId: "my-angular-app-f7e34",
  storageBucket: "my-angular-app-f7e34.appspot.com",
  messagingSenderId: "644826888438",
  appId: "1:644826888438:web:a5e84c346be0b7d6bf94d7",
  measurementId: "G-CPNQXTM409"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ])
  ]
};