import {BrowserModule} from '@angular/platform-browser';
import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
//import { HttpModule }            from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//routing
import {AppRoutes} from './app.routing';
import {RouterModule} from '@angular/router';


import 'rxjs/Observable';
//bootstrap
import {AppComponent} from './app.component';

import {PipesModule} from './pipes/pipes.module';
import {TypesModule} from './core/shell/page/types/types.module';
import {ElementsModule} from './core/elements/elements.module';
import {ShellModule} from './core/shell/shell.module';
import {WidgetsModule} from './custom/widgets/widgets.module';
import {CustomTypesModule} from './custom/types/customtypes.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
//services
import {DeviceService} from './services/device.service';
import {TicketService} from './services/ticket.service';
import {DictionaryService} from './services/dictionary.service';
import {BookmarkService} from './services/bookmark.service';
import {NavigationService} from './services/navigation.service';
import {LessonDataService} from './services/lessondata.service';
import {ShellService} from './services/shell.service';
import {GlobalService} from './services/global.service';
import {TimerService} from './services/timer.service';
import {PreloadService} from './services/preload.service';
import {UpdateRoutesService} from './services/updateroutes.service';
import {ParamsService} from './services/params.service';
import {BandwidthService} from './services/bandwidth.service';
import {TransformService} from './services/transform.service';
import {ListenerService} from './services/listener.service';
import {fakeBackendProvider} from './services/fakebackend.service';
import {Animations} from './lib/animations';

//core

//shell

//forms

//pipes

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    , CommonModule
    , FormsModule
    // ,HttpModule
    , HttpClientModule
    , BrowserAnimationsModule
    , RouterModule.forRoot(AppRoutes)
    , DeviceDetectorModule.forRoot()
    , ElementsModule
    , ShellModule
    , TypesModule
    , WidgetsModule
    , PipesModule
    , CustomTypesModule
  ],
  providers: [
    GlobalService
    , DeviceService
    , DictionaryService
    , LessonDataService
    , UpdateRoutesService
    , ShellService
    , PreloadService
    , TimerService
    , Animations
    , NavigationService
    , BookmarkService
    , TicketService
    , ParamsService
    , BandwidthService
    , TransformService
    , ListenerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
