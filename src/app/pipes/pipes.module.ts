import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafeHtmlPipe} from './safehtml.pipe';
import {SafeUrlPipe} from './safeurl.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  exports: [
    SafeHtmlPipe,
    SafeUrlPipe
  ]
})
export class PipesModule {
}
