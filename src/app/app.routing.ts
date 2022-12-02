import {PageComponent} from './core/shell/page/page.component';

export const AppRoutes = [
  {
    path: '',
    component: PageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
