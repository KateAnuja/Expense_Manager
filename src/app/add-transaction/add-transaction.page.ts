import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {
  transactionForm : FormGroup;
  isSubmitted : boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private transactionService : TransactionService,
  ) { }

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      transactionDate: ['',[Validators.required]],
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description : [''],
    })
  }

  get getControl(){
    return this.transactionForm.controls;
  }

  get errorControl() {
    return this.transactionForm.controls;
  }

  getDate(event){
    let date = new Date(event.target.value).toISOString().substring(0, 10);
    this.transactionForm.get('transactionDate').setValue(date, {
       onlyself: true
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.transactionForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.transactionForm.value);
      this.transactionService.addTransaction(this.transactionForm.value)
      .then(()=>{
        this.transactionForm.reset();
      })
    }
  }

}
