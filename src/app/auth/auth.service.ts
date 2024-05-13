import { Injectable, signal } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { BehaviorSubject, Observable, from, map } from "rxjs";
import { UserInterface } from "../user.interface";

@Injectable({
    providedIn: "root"
})

export class AuthService{

    private _authStatus = new BehaviorSubject<boolean>(false);
    public authStatus = this._authStatus.asObservable();

    constructor(private firebaseAuth : Auth){
    }

    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface |undefined | null> (undefined)
    
    register(email: string, username: string, password: string) : Observable<void>{
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        .then(response => updateProfile(response.user, {displayName: username}))

        return from(promise)
    }

    login(email: string, password: string) : Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth, email, password
        ).then(async() => {
            const currentUser = this.firebaseAuth.currentUser;
            if(currentUser){
                const token = await currentUser.getIdToken();
                console.log("TOKEN IS : ///////////////////--------------"+ token);
                localStorage.setItem("tokenKey", token);
                this._setAuthStatus(true);
            }
            else{
                throw new Error("User not found");
            }
        });
        return from(promise);
    }

    private _setAuthStatus(isAuthenticated : boolean) : void {
        this._authStatus.next(isAuthenticated);
    }

    init() : void {
        if(this.isAuthenticated()){
          this._setAuthStatus(true);
        }
    }

    // loginWithGoogle(): Observable<User | null> {
    //     const provider = new GoogleAuthProvider();
    //     return from(signInWithPopup(this.firebaseAuth, provider))
    //         .pipe(
    //             map(userCredential => userCredential.user)
    //         );
    // }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        localStorage.removeItem('tokenKey');
        this._setAuthStatus(false);
        return from(promise);
    }

    isAuthenticated() : boolean {
        return localStorage.getItem('tokenKey') !== null;
      }
}