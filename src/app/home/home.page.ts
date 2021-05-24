import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { Platform } from '@ionic/angular';

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
    private admob: AdMobPro, 
    private platform: Platform,
  ) {}

  ngOnInit(){
   this.transactionService.getAllTransaction()
   .subscribe((transactionArray)=>{
     let array=[];
     array=transactionArray
     .map(e=>{
      return {
        id : e.payload.doc.id,
        date : e.payload.doc.data()['transactionDate'],
        timeStamp:+new Date(e.payload.doc.data()['transactionDate']),
        amount : e.payload.doc.data()['amount'],
        category : e.payload.doc.data()['category'],
        description : e.payload.doc.data()['description']
      }
     })
      array=array.sort((a, b) =>{
        return b.timeStamp -  a.timeStamp
      });
      this.transactionArray=array;
   })
    
  }

  ionViewDidLoad() {
    this.admob.onAdDismiss()
      .subscribe(() => { console.log('User dismissed ad'); });
  }
  


  goToAddTransactionPage(){
    let adId;
    if(this.platform.is('android')) {
    adId = 'ENHUASSE_ANDROID_ADID';
    }
    this.admob.prepareInterstitial({adId: adId})
    .then(() => { this.admob.showInterstitial(); });
    this.router.navigateByUrl('add-transaction');
  }

}
