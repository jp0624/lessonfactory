import {Injectable} from '@angular/core';
import {PageComponent} from '../core/shell/page/page.component';
import {LessonDataService} from '../services/lessondata.service';
import {ActivatedRoute, Router,} from '@angular/router';

//import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class UpdateRoutesService {
  public lesson = this.router.config;
  public site: any = {};
  public dictionary: any;
  public dictionaryLoaded = false;
  public routeData = [];
  public initialRoutesLoaded: boolean = false;

  constructor(public router: Router,
              private activatedRoute: ActivatedRoute,
              //private http: Http,
              private lessonDataService: LessonDataService) {
  }

  updateRoutes(data) {
    let lessonData = data;
    let newRoutes = [];

    for (let i in lessonData) {
      // console.log('task: ', lessonData[+i]);

      let newRoute = {
        'path': lessonData[+i].name,
        'component': PageComponent
      };
      newRoutes.push(newRoute);
      // console.log('lessonData.length ', +lessonData.length - 1);
      // console.log('lessonData.index ', +i);

      this.router.resetConfig(newRoutes);
      if (lessonData.length - 1 === +i) {

        let defaultRoute = {
          'path': '',
          'pathMatch': 'full',
          'redirectTo': lessonData[0].name
        };
        newRoutes.push(defaultRoute);

        let allRoute = {
          'path': '**',
          'pathMatch': 'full',
          'redirectTo': lessonData[0].name
        };
        newRoutes.push(allRoute);

        this.router.resetConfig(newRoutes);
        this.initialRoutesLoaded = true;

        // Breadcrumb Here
        // this.router.url === '/' + lessonData[0].name
        // this.router.navigate(['/' + lessonData[0].name]);

      }
    }
  }

}
