import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignIn } from 'src/app/interfaces/sign-in.interface';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CustomerModel, DocumentTypeModel } from 'src/app/interfaces/Customer.interface';
import { AccountModel } from 'src/app/interfaces/account.interface';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogged: boolean = false;

  signedUpUsers: CustomerModel[] = [];

  signedUpUser: Object = {};

  documentTypes: DocumentTypeModel[] = [];

  customerAccounts: AccountModel[] = [];

  email = ''
  fullName = ''

  private currentStatus: boolean = false;
  public currentStatusEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.currentStatus);

  constructor(public api: ApiService,
              private http: HttpClient,
              private auth: Auth,
              private router: Router,
    ) {}

  login(form: SignIn): Observable<string>{
    let direction = this.api.url + "/security/signIn";
    return this.http.post(direction, form, { responseType: 'text'});
  }

  signUp(form: SignIn): Observable<string>{
    let direction = this.api.url + "/security/signUp";
    return this.http.post(direction, form, { responseType: 'text'});
  }

  ngOnInit(): void {
    this.defaultLogin()
  }

  defaultLogin() {
    if(!localStorage.getItem('MyToken')){
      localStorage.setItem('MyToken', 'false')
    } 
  }

  activeLogin(){
    localStorage.setItem('key', 'true');
    this.currentStatus = !this.currentStatus;
    this.currentStatusEmitter.next(this.currentStatus);
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  onClick(){
    this.loginWithGoogle()
    .then(response =>{
      console.log(response);
      if(response.user.email) this.email = response.user.email
      if(response.user.displayName) this.fullName = response.user.displayName
      this.router.navigate(['login/signupgoogle']);
    })
    .catch(error => console.log(error))
  }

  //      Intercambio de componentes de signIn y signUp

  public valorCaseLogin : number = 0;
  public switchLogIn : boolean = true;
  public switchLogUp : boolean = false;

  eligeLogin(){

    switch (this.valorCaseLogin){

      case 1 :
        this.switchLogIn = true;
        this.switchLogUp = false;
        console.log("LogIn :" + this.switchLogIn);
        break;

      case 2 :
        this.switchLogUp = true;
        this.switchLogIn = false;
        console.log("LogUp :" + this.switchLogUp);
        break;
    }
  }
}
