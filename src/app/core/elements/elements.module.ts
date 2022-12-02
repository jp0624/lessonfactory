import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {PipesModule} from '../../pipes/pipes.module';

import {ButtonComponent} from './button/button.component';
import {AComponent} from './links/a/a.component';
import {NavComponent} from './links/nav/nav.component';
import {IComponent} from './i/i.component';
import {SpanComponent} from './span/span.component';
import {RouterComponent} from './button/router/router.component';
import {StandardComponent} from './button/standard/standard.component';
import {TimedComponent} from './button/timed/timed.component';
import {FigcaptionComponent} from './figcaption/figcaption.component';
import {FigureComponent} from './figure/figure.component';
import {HeadingComponent} from './heading/heading.component';
import {HeaderComponent} from './header/header.component';
import {SpacerComponent} from './spacer/spacer.component';
import {VideoComponent} from './video/video.component';
import {IframeComponent} from './iframe/iframe.component';
import {VideoplayerComponent} from './videoplayer/videoplayer.component';

@NgModule({
  imports: [
    CommonModule
    , RouterModule
    , PipesModule
  ],
  declarations: [
    ButtonComponent
    , AComponent
    , NavComponent
    , IComponent
    , SpanComponent
    , RouterComponent
    , StandardComponent
    , TimedComponent
    , FigcaptionComponent
    , FigureComponent
    , HeadingComponent
    , HeaderComponent
    , SpacerComponent
    , VideoComponent
    , IframeComponent
    , VideoplayerComponent
  ],
  exports: [
    ButtonComponent
    , AComponent
    , NavComponent
    , IComponent
    , SpanComponent
    , RouterComponent
    , StandardComponent
    , TimedComponent
    , FigcaptionComponent
    , FigureComponent
    , HeadingComponent
    , HeaderComponent
    , SpacerComponent
    , VideoComponent
    , IframeComponent
    , VideoplayerComponent
  ]
})
export class ElementsModule {
}
