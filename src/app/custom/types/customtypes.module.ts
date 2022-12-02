import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// CUSTOM WIDGETS
import {ElementsModule} from '../../core/elements/elements.module';
import {PipesModule} from '../../pipes/pipes.module';
import {WidgetsModule} from '../widgets/widgets.module';
// CUSTOM PAGE TYPES
import {TMM_Int1Component} from './tmm/int1/int1.component';

@NgModule({
  imports: [
    CommonModule
    , ElementsModule
    , PipesModule
    , WidgetsModule
  ],
  declarations: [
    TMM_Int1Component
  ],
  entryComponents: [
    TMM_Int1Component
  ],
  exports: [
    TMM_Int1Component
  ]
})
export class CustomTypesModule {
}
