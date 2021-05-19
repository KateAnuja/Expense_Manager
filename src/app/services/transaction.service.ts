import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../models/transaction';

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
    return this.fireStore.doc(`transaction/${id}`).set({
      transactionDate : transaction.transactionDate,
      amount : transaction.amount,
      category : transaction.category,
      description : transaction.description
    })
  }

  getAllTransaction(){
    this.transactionList = this.fireStore.collection<Transaction>('transaction');
    return this.transactionList;
  }
}
