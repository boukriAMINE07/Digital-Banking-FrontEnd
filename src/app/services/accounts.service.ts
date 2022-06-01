import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails, AccountOperation} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  public getAccount(accountId:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/pageOperations/"+accountId+"?page="+page+"&size="+size);
  }

  public debit(accountId:string,amount:number,description:string){
    let data={accountId,amount,description}
    return this.http.post(environment.backendHost+"/accounts/debit", data);
  }
  public credit(accountId:string,amount:number,description:string){
    let data={accountId,amount,description}
    return this.http.post(environment.backendHost+"/accounts/credit", data);
  }
  public transfer(accountSource:string,accountDestination:string,amount:number,description:string){
    let data={accountSource:accountSource,accountDestination:accountDestination,amount:amount,description:description}
    //dans JS   lorsque le key et value contient le meme nom dans JSON comme l'exemple ce dissus
    // on peut faire seulement
    //let data={accountSource,accountDestination,amount,description}
    return this.http.post(environment.backendHost+"/accounts/transfer", data);
  }

  public accountsCustomer(accountId:number):Observable<Array<AccountOperation>>{
    return this.http.get<Array<AccountOperation>>(environment.backendHost+"/accounts/"+accountId);
  }
}
