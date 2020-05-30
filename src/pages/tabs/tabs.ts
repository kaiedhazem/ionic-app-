import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import {  NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root= LoginPage;
  tab5Root= RegisterPage;
  constructor(public navCtrl: NavController,public authService:AuthProvider) {

  }
  myLogOut(){
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }
}

