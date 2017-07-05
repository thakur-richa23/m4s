import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1,PopoverPage} from '../pages/page1/page1';
import { Page2, PopoverPage1} from '../pages/page2/page2';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page4 } from '../pages/page4/page4';
import { Page5 } from '../pages/page5/page5';
import { Page6 } from '../pages/page6/page6';
import { Page7 } from '../pages/page7/page7';
import { Page8 } from '../pages/page8/page8';
import { Page9 } from '../pages/page9/page9';
import { Page10 } from '../pages/page10/page10';
import { Page15 } from '../pages/page15/page15';
import { Page3 } from '../pages/page3/page3';
import { ContactPage } from '../pages/contact/contact';
import { ForgetpassPage } from '../pages/forgetpass/forgetpass';
import { NewpassPage } from '../pages/newpass/newpass';
import { OndemandPage } from '../pages/ondemand/ondemand';
import { RecentplayPage } from '../pages/recentplay/recentplay';
import { FavouritePage } from '../pages/favourite/favourite';
import { Storage } from '@ionic/storage';
import { Connect } from '../providers/connect';
import { AdMob } from '@ionic-native/admob';
import { AppUpdate } from '@ionic-native/app-update';
import { VgCoreModule } from 'videogular2/core';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Page4,
    PopoverPage,
    PopoverPage1,
    Page5,
    Page6,
    Page7,
    Page8,
    Page9,
    Page10,
    Page15,
    Page3,
    ContactPage,
    ForgetpassPage,
    NewpassPage,
    OndemandPage,
    RecentplayPage,
    FavouritePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    VgCoreModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Page4,
    PopoverPage,
    PopoverPage1,
    Page5,
    Page6,
    Page7,
    Page8,
    Page9,
    Page10,
    Page15,
    Page3,
    ContactPage,
    ForgetpassPage,
    NewpassPage,
    OndemandPage,
    RecentplayPage,
    FavouritePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, Connect, StatusBar, Splashscreen, AppUpdate,AdMob]
})
export class AppModule {}
