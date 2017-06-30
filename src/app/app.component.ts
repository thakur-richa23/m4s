import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { Page6 } from '../pages/page6/page6';
import { Page9 } from '../pages/page9/page9';
import { Page15 } from '../pages/page15/page15';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppUpdate } from '@ionic-native/app-update';
import { AdMob } from '@ionic-native/admob';
interface AdMobtype{
  banner:string,
  interstitial:string
}

@Component({
  templateUrl: 'app.html',
})

export class MyApp {
  Page6 = Page6;
  Page9 = Page9;
  data: any;
  selected: any;
  allCategories: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,statusBar: StatusBar, splashScreen: Splashscreen, private admob: AdMob, private appupdate: AppUpdate) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: Page1 },
      { title: 'Genres', component: Page9 },
      { title: 'All Categories', component:Page15 }
    ];
     const updateUrl = 'https://movies4star.com/update.xml';
     appupdate.checkAppUpdate(updateUrl);
    

    platform.ready().then(() => {
        var admobid: AdMobtype;
        if (/(android)/i.test(navigator.userAgent)) {
        admobid = { // for Android
          banner: 'ca-app-pub-2266939936529282~3437745855',
          interstitial: 'ca-app-pub-2266939936529282/1821411858'
        };
      } if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
          banner: 'ca-app-pub-234234234234324/234234234234',
          interstitial: 'ca-app-pub-234234234234324/234234234234'
        };
      } else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-234234234234324/234234234234',
          interstitial: 'ca-app-pub-234234234234324/234234234234'
        };
      }
       this.admob.createBanner({
        adId: admobid.banner,
        isTesting: true, //comment this out before publishing the app
        autoShow: true
      })

    });

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
