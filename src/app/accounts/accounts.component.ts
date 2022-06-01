import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {AccountDetails, AccountOperation} from "../model/account.model";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  currentPage :number=0;
  pageSize : number=5;
  errorMessage!:string;
  fromGroupAccount!:FormGroup
  accountObservable!:Observable<AccountDetails>
  operationFormGroup!:FormGroup

  constructor(private fb:FormBuilder,private accountsService:AccountsService) { }

  ngOnInit(): void {
    this.fromGroupAccount=this.fb.group({
      accountId:this.fb.control("")
    });

    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    })
  }

  handleSearchAccount() {
        let accountId:string=this.fromGroupAccount.value.accountId;


        this.accountObservable=this.accountsService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
          catchError(err => {
            this.errorMessage=err.message;
            return throwError(err);
          })
        );

  }

  goToPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount()
  }


  handleAccountOperation() {
        let accountSource:string=this.fromGroupAccount.value.accountId;

        let operationType:string=this.operationFormGroup.value.operationType;
        let amount:number=this.operationFormGroup.value.amount;
         let description:string=this.operationFormGroup.value.description;
         let accountDestination:string=this.operationFormGroup.value.accountDestination;
      if(operationType=='DEBIT') {
          this.accountsService.debit(accountSource, amount, description).subscribe({
            next:(data)=>{
                        alert("Success Debit")
              this.handleSearchAccount()
              this.operationFormGroup.reset()
            },error:(err) => {
              console.log(err)
            }
          })

        }else if(operationType=='CREDIT') {
            this.accountsService.credit(accountSource,amount,description).subscribe({
              next:(data)=>{
                alert("Success Credit")
                this.handleSearchAccount()
                this.operationFormGroup.reset()
              },error:(err)=>{
                console.log(err)
              }
            })

        }else if(operationType=='TRANSFER'){
            this.accountsService.transfer(accountSource,accountDestination,amount,description).subscribe({
              next:(data)=>{
                alert("Success Transfer")
                this.handleSearchAccount()
                this.operationFormGroup.reset()
              },error:(err)=>{
                console.log(err)
              }
            })

        }


  }
}
