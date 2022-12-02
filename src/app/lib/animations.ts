import {animate, style, transition, trigger} from '@angular/animations';

export class Animations {

  static page = [

    trigger('delayDelete', [
      //exit
      transition('* => void',
        animate(
          //time to wait before deleting
          '10000ms ease-out',
          style({
            visibility: 'visible'
          })
        )
      ),
    ]),
    trigger(
      'slideInOut', [
        transition('void => *', [
          style({
            left: '100%',
            transform: 'translate3d(0%, 0, 0)'
          }),
          animate('1250ms ease-in-out', style({
            left: '100%',
            transform: 'translate3d(-100%, 0, 0)'
          }))
        ]),
        transition('* => void', [
          style({
            transform: 'translate3d(0%, 0, 0)'
          }),
          animate('1250ms ease-in-out', style({
            transform: 'translate3d(-100%, 0, 0)'
          }))
        ])
      ]
    ),
    trigger(
      'slideInOutRtl', [
        transition(':enter', [
          style({
            transform: 'translate(-100%, 0%)',
            'z-index': 2
          }),
          animate('750ms', style({
            transform: 'translate(0%, 0%)',
            'z-index': 2
          }))
        ]),
        transition(':leave', [
          style({
            transform: 'translate(0%, 0%)',
            'z-index': -1
          }),
          animate('1250ms', style({
            transform: 'translate(100%, 0%)',
            'z-index': -1
          }))
        ])
      ]
    ),

    trigger(
      'slideOut', [
        transition(':enter', [
          style({
            'z-index': 2,
            opacity: 0
          }),
          animate('5000ms', style({
            'z-index': 2,
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            transform: 'translate(0%, 0%)',
            'z-index': -1
          }),
          animate('7500ms', style({
            transform: 'translate(-100%, 0%)',
            'z-index': -1
          }))
        ])
      ]
    ),
    trigger(
      'slideOutRtl', [
        transition(':enter', [
          style({
            'z-index': 2,
            opacity: 0
          }),
          animate('5000ms', style({
            'z-index': 2,
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            transform: 'translate(0%, 0%)',
            'z-index': -1
          }),
          animate('7500ms', style({
            transform: 'translate(100%, 0%)',
            'z-index': -1
          }))
        ])
      ]
    ),

    trigger(
      'fade', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('500ms', style({opacity: 0}))
        ])
      ]
    )


  ];

}
