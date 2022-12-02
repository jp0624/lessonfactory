import {Injectable} from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class PreloadService implements HttpInterceptor {
  public video;

  constructor(private http: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return;
  }

  dvideo(src) {

    var req = new XMLHttpRequest();
    req.open('GET', src, true);
    req.responseType = 'blob';

    req.onload = () => {
      //console.log('onload: ', this.res)
      /*
       // Onload is triggered even on 404
       // so we need to check the status code
       if (this.status === 200) {
          var videoBlob = this.response;
          var vid = URL.createObjectURL(videoBlob); // IE10+
          // Video is now downloaded
          // and we can set it as source on the video element
          video.src = vid;
       }
       */
    };
    req.onerror = function () {
      // Error
    };
    req.send();
  }

  loadVideo(src) {
    this.http
      .get(src)
      .subscribe(
        data => {
          console.log('DATA: ', data);
        },
        (err) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            console.log('err.error: ', err);

            if (err.status === 200) {

              console.log('VIDEO DOWNLOADED');
              //console.log('URL: ', window.URL.createObjectURL(err.url))
              //var vid = URL.createObjectURL(err.url);
              //var vid = window.URL.createObjectURL(videoBlob); // IE10+
              // Video is now downloaded
              // and we can set it as source on the video element
              //this.video.src = vid;
              //console.log('this.video: ', this.video)
              //console.log('VIDEO: ', vid)
              //alert('video downloaded')

            }

          }
        }
      );
  }

  XloadVideo(src): Observable<any> {
    return this.http
      .get(src)
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
    // .map((response: Response) => response)

  }
}
