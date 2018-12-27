import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ViewQrPage } from '../view-qr/view-qr';
import { PopoverPage } from '../popover/popover';
import { ScannerProvider } from '../../providers/scanner/scanner';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SuccessPage } from '../success/success';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  value:any;
  private participation = [];
  private data = [];
  constructor(public navCtrl: NavController,
    private scanner:BarcodeScanner,
    private popover: PopoverController,
    private scannerProvider: ScannerProvider,
    private db: FirebaseProvider
    ) {
  }
  ionViewWillEnter(){
    this.getData();
  }

  popup(event){
    let popover = this.popover.create(PopoverPage);
    popover.present(
      {
        ev: event
      }
    );
  }

  startScan(){
    this.scanner.scan().then(data =>{
      this.value = data.text;
      this.db.checkAuth().subscribe(auth =>{
        if(auth){
          this.db.getData('participation').where('email','==',auth.email).get()
          .then(doc =>{
            if(!doc.empty){
              doc.forEach(item =>{
                
                this.participation = item.data().participation;
                this.participation.push(JSON.parse(this.value))
                let info = {email: auth.email, participation: this.participation}
                // this.value.email = auth.email
                this.saveData(info);
                this.navCtrl.push(SuccessPage,{
                  participate: JSON.parse(this.value)
                });
              })
            }
            else{
              alert("Not found")
            }
          })
        }
      })
      
    })
    .catch(e =>{
      alert(e);
    })
  }
  saveData(data){
    this.scannerProvider.saveData(data);
  }
  
  getData(){
    this.scannerProvider.getData().onSnapshot(response =>{
      let data = response.docChanges();
      data.forEach(item =>{
        console.log(item);
        if(item.type == 'added'){
          this.data.push(
            {
              id: item.doc.id,
              event: item.doc.data().event
            }
          )
        }
        else if(item.type == 'removed'){
          this.data.splice(item.oldIndex, 1);
        }
        else if(item.type == 'modified'){
          this.data[item.oldIndex] = {
            id: item.doc.id,
            event: item.doc.data().event
          }
        }
      })
    })
  }
  viewData(data){
    this.navCtrl.push(ViewQrPage,{
      data
    })
  }

}
