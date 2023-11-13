import { Component, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //This whole section was complicated, the how to is here: https://www.youtube.com/watch?v=WqLPSZZ2dcs&t=975s
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow:'hidden'
        }),
        query(
          ':enter, :leave',
          [
            style({
              // display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),

        // query(':enter', [style({ opacity: 0 })], { optional: true }), took this out because we did it in the group, so no longer a need for it to be in the main query

        group([ //groups two steps together. in this case we want the enter and leave to overlap each other, or happen at the same time
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform:'translateX(-80px)'
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform:'translateX(80px)',
                opacity: 0
              }),
              animate(
                '200ms 100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)'
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      //below is from right to left transitions
      transition(':decrement', [
        style({
          position: 'relative',
          overflow:'hidden'
        }),
        query(
          ':enter, :leave',
          [
            style({

              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform:'translateX(80px)'
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform:'translateX(-80px)',
                opacity: 0
              }),
              animate(
                '200ms 100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)'
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  bg: string = ''
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) return outlet.activatedRouteData['tab'];
  }
}
