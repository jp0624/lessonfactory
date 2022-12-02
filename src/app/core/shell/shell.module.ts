import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './page/page.component';

import {ElementsModule} from '../elements/elements.module';
import {TypesModule} from './page/types/types.module';
//services
import {LessonDataService} from '../../services/lessondata.service';
import {GlobalService} from '../../services/global.service';
import {NavMainComponent} from './nav/nav-main/nav-main.component';
import {NavProgressComponent} from './nav/nav-progress/nav-progress.component';
import {NavBtnNextComponent} from './nav/nav-main/nav-btn-next/nav-btn-next.component';
import {BackdropComponent} from './backdrop/backdrop.component';

@NgModule({
  imports: [
    CommonModule,
    ElementsModule,
    TypesModule
  ],
  declarations: [
    PageComponent,
    NavMainComponent,
    NavProgressComponent,
    NavBtnNextComponent,
    BackdropComponent
  ],
  providers: [
    GlobalService,
    LessonDataService
  ],
  exports: [
    PageComponent,
    NavMainComponent,
    BackdropComponent
  ]
})
export class ShellModule {
}
