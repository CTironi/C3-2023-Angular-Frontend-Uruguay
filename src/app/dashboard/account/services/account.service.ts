import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from 'src/app/interfaces/Customer.interface';
import { ApiService } from 'src/app/services/api.service';
import { AccountModel } from '../../../interfaces/account.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { UpdateCustomerModel } from '../../../interfaces/update-customer.interface';
import { NewAccountModel } from 'src/app/interfaces/new-account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  options = { headers: this.headers };

  customer: CustomerModel = <CustomerModel>this.loginService.signedUpUser;
  customerId!: string;


  constructor(private http: HttpClient,
              private api: ApiService,
              private loginService: LoginService,
  ) { }

  helper = new JwtHelperService();

  getCustomerFromLocalStorage() {
    const token = localStorage.getItem('token')

    if(token != null) {
      const user: CustomerModel | null = this.helper.decodeToken(token);
      if(user){
        return user;
      }
    }
    throw new Error('')
  }

  public getAllCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]> (this.api.url + "/customer/getAll");
  }

  public getcustomerById(): Observable<CustomerModel> {
    const user: CustomerModel = this.getCustomerFromLocalStorage();
    return this.http.get<CustomerModel> (this.api.url + "/customer/getCustomer/" + user.id);
  }

  public getcustomerByEmail(): Observable<CustomerModel> {
    const user: CustomerModel = this.getCustomerFromLocalStorage();
    return this.http.get<CustomerModel>(this.api.url + "/customer/getCustomerByEmail/" + user.email);
  }

  public getAllAccount(id: string):Observable<AccountModel[]> {
    return this.http.get<AccountModel[]> (this.api.url + "/account/getByCustomerId/" + id);
  }

  public getCustomer() {
    this.getcustomerByEmail().subscribe((response) => {
      this.customer = response,
      this.customerId = response.id
      }
    )
  }

  public postUpdateCustomer(id: string, customer: UpdateCustomerModel): Observable<UpdateCustomerModel> {
    return this.http.put<UpdateCustomerModel>(this.api.url + "/customer/updateCustomer/" + id, customer)
  }

  postNewAccount(form: NewAccountModel): Observable<NewAccountModel> {
    let direction = this.api.url + "/account/createAccount";
    return this.http.post<NewAccountModel>(direction, form);
  }
}
