import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../models/transaction';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionList : any;
  
  constructor(
    private fireStore: AngularFirestore
  ) { } 

  addTransaction(transaction : Transaction){
    const id = this.fireStore.createId();
    return this.fireStore.doc(Constants.DB_TRANSACTION+"/"+id).set({
      transactionDate : transaction.transactionDate,
      amount : transaction.amount,
      category : transaction.category,
      description : transaction.description
    })
  }

  getAllTransaction(){
    return  this.fireStore.collection<Transaction>(Constants.DB_TRANSACTION).snapshotChanges();
  }
}
