import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { Page6 } from '../pages/page6/page6';
import { Page5 } from '../pages/page5/page5';
import { Page4 } from '../pages/page4/page4';
import { Page9 } from '../pages/page9/page9';
import { Page15 } from '../pages/page15/page15';
import { OndemandPage } from '../pages/ondemand/ondemand';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppUpdate } from '@ionic-native/app-update';
import { AppVersion } from 'ionic-native';
import { AdMob } from '@ionic-native/admob';
import { Storage } from '@ionic/storage';
import { NewpassPage } from '../pages/newpass/newpass';

declare var window:any;
// interface AdMobtype{
//   banner:string,
//   interstitial:string
// }

@Component({
  templateUrl: 'app.html',
})

export class MyApp {
  Page6 = Page6;
  Page9 = Page9;
  Page4 = Page4;
  data: any;
  selected: any;
  allCategories: any;
  version:any;
  loggedIn: boolean;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  pages: Array<{title: string, component: any, icon:any}>;

  constructor(public platform: Platform, public menu: MenuController, statusBar: StatusBar, splashScreen: Splashscreen, public storage: Storage, private appupdate: AppUpdate) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: Page1, icon: 'home' },
      { title: 'Genres', component: Page9, icon: 'musical-notes'},
      { title: 'All Categories', component:Page15, icon: 'md-list-box'}
    ];

 const updateUrl = 'https://movies4star.com/update.xml';
  appupdate.checkAppUpdate(updateUrl);
}

  initializeApp() {
    this.platform.ready().then(() => {
    StatusBar.hide();
    Splashscreen.hide();
     
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
