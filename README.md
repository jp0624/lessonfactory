# LessonFactoryApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.

## Demos

https://alert.evivids.com/?local=asse-18

https://alert.evivids.com/?local=tmm

https://alert.evivids.com/?local=pvisc

https://alert.evivids.com/?local=sat

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## JSON Server
run `json-server --watch db.json` from the route to have the temporary json running as a db server.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Vercel demonstration

The legacy Angular 6 application builds on Node 22 using Dart Sass through the existing node-sass loader API. Vercel serves `dist` and rewrites frontend routes to index.html. Opening a Vercel host without query parameters selects the bundled `sat` sample in local mode, which now reads the repository JSON rather than requiring the historical private API. Other local samples can be selected with `?local=tmm`, `?local=pvisc` or `?local=asse-18`. Ticket/preview modes retain their backend integration and need the original services. This is an archived demonstration, not a production training service.
