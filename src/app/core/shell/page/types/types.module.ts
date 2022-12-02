import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
//import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {ElementsModule} from '../../../../core/elements/elements.module';
import {PipesModule} from '../../../../pipes/pipes.module';
// Generic Page Types
import {AssessmentComponent} from './assessment/assessment.component';
import {FigurefigcaptionComponent} from './figurefigcaption/figurefigcaption.component';
import {HotspotComponent} from './hotspot/hotspot.component';
import {SlideshowComponent} from './slideshow/slideshow.component';
import {TitlescreenComponent} from './titlescreen/titlescreen.component';
import {QuestionComponent} from './question/question.component';
import {AnswerComponent} from './question/answer/answer.component';
import {CentertextComponent} from './centertext/centertext.component';
import {HtmlcssComponent} from './htmlcss/htmlcss.component';
import {TheatreComponent} from './theatre/theatre.component';
import {StageComponent} from './stage/stage.component';
import {VideopageComponent} from './video/video.component';
import {LoadingComponent} from './loading/loading.component';
import {SectionmarkerComponent} from './sectionmarker/sectionmarker.component';
import {MarkerComponent} from './sectionmarker/marker/marker.component';
import {ChartComponent} from './chart/chart.component';
import {VideoassessmentComponent} from './videoassessment/videoassessment.component';
import {IframepageComponent} from './iframe/iframe.component';
import {CentercontentComponent} from './centercontent/centercontent.component';
import {ImageswapComponent} from './imageswap/imageswap.component';
import {BandwidthComponent} from './bandwidth/bandwidth.component';
import {InteractivevideosceneComponent} from './interactivevideoscene/interactivevideoscene.component';
import {VideoplayerComponent} from './interactivevideoscene/videoplayer/videoplayer.component';
import {SlideComponent} from './slideshow/slide/slide.component';
import {VideoplaypauseComponent} from './videoplaypause/videoplaypause.component';
import {VideoeventComponent} from './videoevent/videoevent.component';
import {ResultsComponent} from './results/results.component';
import {ResultsscreenComponent} from './interactivevideoscene/resultsscreen/resultsscreen.component';
import {TimedreactionComponent} from './timedreaction/timedreaction.component';
import {ImagesequenceComponent} from './imagesequence/imagesequence.component';
import {EssentialQuestionComponent} from './video/Essentialquestion/essentialquestion.component';
import {EssentialAnswerComponent} from './video/Essentialquestion/essentialanswer/essentialanswer.component';
import {VideoswapComponent} from './videoswap/videoswap.component';

const moduleRoutes: Routes = [
  /*
  {
      path: 'course',
      component: CourseDashboardComponent,
          children: [
            {
                path: '',
                component: CourseHomeComponent
            },
            {
                path: 'list',
                component: CourseListComponent
            },
            {
                path: ':id',
                component: CourseDetailComponent
            },
            {
                path: 'create',
                component: CourseDetailComponent
            }
      ]
  }
  */
];

@NgModule({
  imports: [
    CommonModule
    , ElementsModule
    , PipesModule
    , RouterModule.forChild(moduleRoutes)
  ],
  declarations: [
    AssessmentComponent
    , FigurefigcaptionComponent
    , HotspotComponent
    , SlideshowComponent
    , TitlescreenComponent
    , QuestionComponent
    , AnswerComponent
    , CentertextComponent
    , HtmlcssComponent
    , TheatreComponent
    , StageComponent
    , VideopageComponent
    , LoadingComponent
    , SectionmarkerComponent
    , MarkerComponent
    , ChartComponent
    , VideoassessmentComponent
    , IframepageComponent
    , CentercontentComponent
    , ImageswapComponent
    , BandwidthComponent
    , InteractivevideosceneComponent
    , VideoplayerComponent
    , SlideComponent
    , VideoplaypauseComponent
    , ResultsComponent
    , ResultsscreenComponent
    , VideoeventComponent
    , TimedreactionComponent
    , ImagesequenceComponent
    , EssentialQuestionComponent
    , EssentialAnswerComponent
    , VideoswapComponent
  ],
  entryComponents: [
    AssessmentComponent
    , FigurefigcaptionComponent
    , HotspotComponent
    , SlideshowComponent
    , TitlescreenComponent
    , QuestionComponent
    , AnswerComponent
    , CentertextComponent
    , HtmlcssComponent
    , TheatreComponent
    , VideopageComponent
    , LoadingComponent
    , SectionmarkerComponent
    , MarkerComponent
    , ChartComponent
    , VideoassessmentComponent
    , IframepageComponent
    , CentercontentComponent
    , ImageswapComponent
    , BandwidthComponent
    , InteractivevideosceneComponent
    , VideoplayerComponent
    , SlideComponent
    , VideoplaypauseComponent
    , ResultsComponent
    , ResultsscreenComponent
    , VideoeventComponent
    , TimedreactionComponent
    , ImagesequenceComponent
    , EssentialQuestionComponent
    , EssentialAnswerComponent
    , VideoswapComponent
  ],
  exports: [
    AssessmentComponent
    , FigurefigcaptionComponent
    , HotspotComponent
    , SlideshowComponent
    , TitlescreenComponent
    , QuestionComponent
    , AnswerComponent
    , CentertextComponent
    , HtmlcssComponent
    , TheatreComponent
    , StageComponent
    , VideopageComponent
    , LoadingComponent
    , SectionmarkerComponent
    , MarkerComponent
    , ChartComponent
    , VideoassessmentComponent
    , IframepageComponent
    , CentercontentComponent
    , ImageswapComponent
    , BandwidthComponent
    , InteractivevideosceneComponent
    , VideoplayerComponent
    , SlideComponent
    , VideoplaypauseComponent
    , ResultsComponent
    , ResultsscreenComponent
    , VideoeventComponent
    , TimedreactionComponent
    , EssentialQuestionComponent
    , EssentialAnswerComponent
    , VideoswapComponent
  ]
})
export class TypesModule {
};
