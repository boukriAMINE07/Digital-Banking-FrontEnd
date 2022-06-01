import { Component, OnInit } from '@angular/core';
import {AccountsService} from "../services/accounts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customerId!:string;
  customer!:Customer
  constructor(private  accountsService:AccountsService,private activatedRoute:ActivatedRoute,private router:Router) {
        this.customer=this.router.getCurrentNavigation()?.extras.state as Customer
  }

  ngOnInit(): void {
    this.customerId=this.activatedRoute.snapshot.params['id'];

  }

}
