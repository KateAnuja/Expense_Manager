import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transactionArray : any= [];
  constructor(
    private transactionService : TransactionService,
    private router : Router,
  ) {}

  ngOnInit(){
   this.transactionService.getAllTransaction()
   .subscribe((transactionArray)=>{
     this.transactionArray=transactionArray
     .map(e=>{
      return {
        id : e.payload.doc.id,
        date : e.payload.doc.data()['transactionDate'],
        amount : e.payload.doc.data()['amount'],
        category : e.payload.doc.data()['category'],
        description : e.payload.doc.data()['description']
      }
     })
   })
    console.log(this.transactionArray);
    this.transactionArray.sort(function compare(a, b) {
      var dateA = new Date(a.transactionDate).getUTCDate();
      var dateB = new Date(b.transactionDate).getUTCDate();
      return dateA - dateB;
    });
  }

  goToAddTransactionPage(){
    this.router.navigateByUrl('add-transaction');
  }

}
