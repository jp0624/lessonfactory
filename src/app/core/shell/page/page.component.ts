import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs';
import {ShellService} from '../../../services/shell.service';
import {DeviceService} from '../../../services/device.service';
import {LessonDataService} from '../../../services/lessondata.service';
import {NavigationService} from '../../../services/navigation.service';
import {DictionaryService} from '../../../services/dictionary.service';
import {ParamsService} from '../../../services/params.service';
import {Animations} from '../../../lib/animations';

import {AnswerComponent} from './types/question/answer/answer.component';
import {AssessmentComponent} from './types/assessment/assessment.component';
import {CentertextComponent} from './types/centertext/centertext.component';
import {FigurefigcaptionComponent} from './types/figurefigcaption/figurefigcaption.component';
import {HotspotComponent} from './types/hotspot/hotspot.component';
import {HtmlcssComponent} from './types/htmlcss/htmlcss.component';
import {QuestionComponent} from './types/question/question.component';
import {SlideshowComponent} from './types/slideshow/slideshow.component';
import {TitlescreenComponent} from './types/titlescreen/titlescreen.component';
import {TheatreComponent} from './types/theatre/theatre.component';
import {VideopageComponent} from './types/video/video.component';
import {LoadingComponent} from './types/loading/loading.component';
import {SectionmarkerComponent} from './types/sectionmarker/sectionmarker.component';
import {ChartComponent} from './types/chart/chart.component';
import {VideoassessmentComponent} from './types/videoassessment/videoassessment.component';
import {IframepageComponent} from './types/iframe/iframe.component';
import {CentercontentComponent} from './types/centercontent/centercontent.component';
import {ImageswapComponent} from './types/imageswap/imageswap.component';
import {BandwidthComponent} from './types/bandwidth/bandwidth.component';
import {InteractivevideosceneComponent} from './types/interactivevideoscene/interactivevideoscene.component';
import {VideoplaypauseComponent} from './types/videoplaypause/videoplaypause.component';
import {ResultsComponent} from './types/results/results.component';
import {TimedreactionComponent} from './types/timedreaction/timedreaction.component';
import {ImagesequenceComponent} from './types/imagesequence/imagesequence.component';


import {VideoswapComponent} from './types/videoswap/videoswap.component';
import {VideoeventComponent} from './types/videoevent/videoevent.component';
import {TMM_Int1Component} from '../../../custom/types/tmm/int1/int1.component';
import {EssentialQuestionComponent} from './types/video/Essentialquestion/essentialquestion.component';
import {EssentialAnswerComponent} from './types/video/Essentialquestion/essentialanswer/essentialanswer.component';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  host: {
    //'[@slideOut]': 'this?.isHome',
    '[@slideInOut]': '!isHome',
    '[class.home]': 'isHome',
    '[class.inner]': 'isInner',
    '[class]': 'pagetype'
    //'[@slideInOut]': 'true'
  },
  animations: Animations.page
})
export class PageComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {

  @ViewChild('type', {read: ViewContainerRef})
  type: ViewContainerRef;
  @ViewChild('section')
  sectionEl: ElementRef;
  @ViewChild('wrapper')
  wrapperEl: ElementRef;

  activePage: any = this.lessonDataService.activePage;
  activePageId: any = this.lessonDataService.activePageId;
  private activeData;

  private wrapperSize = {
    x: 0,
    y: 0
  };

  private winSizeSubscription;
  private subscription: Subscription;
  private isHome = false;
  private isInner = false;
  private pagetype;
  private textDir;
  private customFont;

  private component: any;

  pageTypes = {
    //Generic Page Type Components
    AssessmentComponent: AssessmentComponent
    , FigurefigcaptionComponent: FigurefigcaptionComponent
    , HotspotComponent: HotspotComponent
    , SlideshowComponent: SlideshowComponent
    , TitlescreenComponent: TitlescreenComponent
    , QuestionComponent: QuestionComponent
    , AnswerComponent: AnswerComponent
    , CentertextComponent: CentertextComponent
    , HtmlcssComponent: HtmlcssComponent
    , TheatreComponent: TheatreComponent
    , VideopageComponent: VideopageComponent
    , LoadingComponent: LoadingComponent
    , SectionmarkerComponent: SectionmarkerComponent
    , ChartComponent: ChartComponent
    , VideoassessmentComponent: VideoassessmentComponent
    , IframepageComponent: IframepageComponent
    , CentercontentComponent: CentercontentComponent
    , ImageswapComponent: ImageswapComponent
    , BandwidthComponent: BandwidthComponent
    , InteractivevideosceneComponent: InteractivevideosceneComponent
    , VideoplaypauseComponent: VideoplaypauseComponent
    , ResultsComponent: ResultsComponent
    , TimedreactionComponent: TimedreactionComponent
    , ImagesequenceComponent: ImagesequenceComponent
    , VideoeventComponent: VideoeventComponent
    , VideoswapComponent: VideoswapComponent
    , EssentialQuestionComponent: EssentialQuestionComponent
    , EssentialAnswerComponent: EssentialAnswerComponent

    //Custom Page Type Components
    , TMM_Int1Component: TMM_Int1Component
  };

  constructor(private resolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private router: Router,
              private dictionaryService: DictionaryService,
              private lessonDataService: LessonDataService,
              private navigationService: NavigationService,
              private shellService: ShellService,
              private rd: Renderer2,
              private activatedRoute: ActivatedRoute,
              private paramsService: ParamsService,
              private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.textDir = this.lessonDataService.textDir;
    setTimeout(() => {
      this.getInitSizing();
      this.lessonDataService.getActivePage(this.paramsService.paramData);
      if (this.activePageId === 0) {
        this.isHome = true;
      } else {
        this.isInner = true;
      }
    });

    this.subscription = this.lessonDataService.taskChange
      .subscribe(event => {
        console.log('SUB TRIGGERED activePageId: ', this.activePageId);
        console.log('SUB TRIGGERED change: ', event);
        this.lessonDataService.gotoTask(this.lessonDataService.activePageId);
      });
      
    // if (document.location.href.split('?').length === 2) {
    //   location.href = location.origin + '/' + this.router.config[0].path;
    //   return;
    // }

    console.warn('this.activePage: ', this.activePage);
    if (this.activePage.pagetype) {
      this.pagetype = this.activePage.pagetype;
    }
    if (this.paramsService.paramData.language_code === 'my') {
      this.customFont = 'Zawgyi-One';
    }
    if (this.deviceService.ssTest) {
      if (sessionStorage.getItem('language_code') === 'my') {
        this.customFont = 'Zawgyi-One';
      }
    }
    this.dynamicComponents();
  }

  ngOnChanges() {

  }

  ngAfterContentInit() {

  }

  ngAfterViewInit() {
   
    //ExpressionChangedAfterItHasBeenCheckedError: Expression moved the dynamicComponents function into nginit
    //this.dynamicComponents();
  }

  dynamicComponents(){
      console.error(this.lessonDataService.dataLoaded);
      console.error(this.activePage);
      console.error(this.activePageId);
      if (!this.activePage) {
        return;
      }
      const pageTypeFactory = this.resolver.resolveComponentFactory(this.pageTypes[this.activePage.pagetype]);

      this.component = this.type.createComponent(pageTypeFactory);

      //this.component.instance. //this.deviceType
      this.component.instance.activePage = this.activePage;
      this.component.instance.activePageId = this.activePageId;

      console.warn('this.component.instance: ', this.component.instance);
      console.log(this.component.instance.activePage);
      console.log(this.component.location);

      console.log('this.component: ', this.component);

      // if (this.activePage.lockType && this.activePage.lockType !== 'none') {
      if (this.activePage.lockType) {
        this.component.instance.contentStatus
          .subscribe(event => {
            console.error('EVENT IN PAGE: ', event);
            this.updateNavigationService(event);
          });
    }

    this.getInitSizing();
    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });
    setTimeout(() => {
      this.component.instance.pageLoaded = true;
      this.component.instance.lessonType = this.lessonDataService.lessonType;
    });
    setTimeout(() => {
      this.component.instance.inView = true;
    }, 1250);
  }
  updateNavigationService(event) {
    // console.warn('--------------------------')
    // console.trace('updateNavigationService')
    // console.warn('--------------------------')
    // console.log('(page) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Subscribe Event: ', event);
    this.activeData = event;
    this.activeData.pageId = this.activePageId;
    this.activeData.pageLength = this.lessonDataService.dataLoaded.length;

    this.navigationService.updateNavigationBtn(this.activeData);

  }

  ngOnDestroy() {

  }

  getInitSizing() {

    setTimeout(() => {

      this.getWrapperSize();
      if (this.component) {
        this.component.instance.wrapperSize = this.wrapperSize;
      }

    });
  }

  getWrapperSize() {
    this.wrapperSize = {
      x: this.wrapperEl.nativeElement.offsetWidth,
      y: this.wrapperEl.nativeElement.offsetHeight
    };
  }

}
