import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 


rootPage:any = TabsPage;
  image: null;
  latitude : any;
  longitude :any;
  typeS:'' ;
  typeN:'' ;
  description:'';
  Adresse:'';
  myDate: String = new Date().toISOString();
  
  constructor( public navCtrl: NavController,private camera: Camera,private emailcomposer: EmailComposer , private geolocation: Geolocation,public authService:AuthProvider) {}

  public capturedPicture(){
    const options : CameraOptions = {
     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
     destinationType: this.camera.DestinationType.FILE_URI, 
    }
    this.camera.getPicture(options).then((imageData) => {
    this.image = imageData;
   
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude= resp.coords.latitude;
       this.longitude= resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
Send(){
  let email = {
    to: 'gestiondeprojetetreclamation@gmail.com',
    cc: 'gaiedhazem@gmail.com',
   
    attachments: [
   this.image
    ],
    subject: 'Photo',
    body: 'type de site=   '+ this.typeS + '   intervention de type =   ' + this.typeN + '   date de la visite technique = '
    + this.myDate +
  '    localization: Latitude = '+ this.latitude +'   Longitude = '+ this.longitude
  + '    description: ' + this.description ,
    isHtml: true
  }
  
  // Send a text message using default options
  this.emailcomposer.open(email);
}
myLogOut(){
  this.authService.logout();
  this.rootPage=LoginPage;
  this.navCtrl.push(LoginPage);
  location.reload();
}
  }

 