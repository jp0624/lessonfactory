import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhoneComponent} from './phone/phone.component';
import {SpeedometerComponent} from './speedometer/speedometer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhoneComponent,
    SpeedometerComponent
  ],
  exports: [
    PhoneComponent,
    SpeedometerComponent
  ]
})
export class WidgetsModule {
}
