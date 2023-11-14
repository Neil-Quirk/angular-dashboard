import { Component, OnInit, Optional } from '@angular/core';
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
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators'

const baseStyles = style({
  // display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})

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
            baseStyles
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
            baseStyles
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


    //transition to a secondary state (when you bring up a manage or add window)
      transition('* => secondary', [
        style({
          position: 'relative',

        }),
        query(
          ':enter, :leave',
          [
            baseStyles
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
                  transform:'scale(0.8)'
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform:'scale(1.2)',
                opacity: 0
              }),
              animate(
                '200ms 100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'scale(1.0)'
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      //END OF TRANSITION TO SECONDARY STATE

      //BEGINNING OF TRANSITION FROM SECONDARY STATE

      transition('secondary => *', [
        style({
          position: 'relative',

        }),
        query(
          ':enter, :leave',
          [
            baseStyles
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
                  transform:'scale(1.25)'
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform:'scale(0.8)',
                opacity: 0
              }),
              animate(
                '200ms 100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'scale(1.0)'
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),

      //END OF TRANSITION FROM SECONDARY STATE

    ]),

    // This is the trigger to fade out the background change
    trigger('bgAnim', [
      transition(':leave', [
        animate(1200, style({
          opacity: 0
        }))
      ])
    ]),
    //This trigger caused the background change button to fade in and out when clicked
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0}),
          animate(250, style({
            opacity: 1
          }))
      ]),
      transition(':leave', [
        animate(250, style({
          opacity: 0
        }))
      ])
    ])
  ],
})
export class AppComponent implements OnInit{
  backgrounds: string[] = ['https://images.unsplash.com/photo-1699865701680-ef9214d90fbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']

  loadingBGImage: boolean | undefined

  dateTime: Observable<Date> | undefined
  
  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }


  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) { 
      const tab = outlet.activatedRouteData['tab']
      if(!tab) return 'secondary'
      return tab
    };
  }
  async changeBGImage():Promise<void> {
    this.loadingBGImage = true
    const response = await fetch('https://source.unsplash.com/random/ 1920x1080', {
      method:'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(response.url)
    if(alreadyGot){
      return this.changeBGImage()
    }

    this.backgrounds.push(response.url)

    // const newBG = response.url;

    // if(newBG === this.backgrounds) 
    // return this.changeBGImage()

    // this.backgrounds = newBG
  }
  onBGImageLoad(imgEvent: Event){
 //bg image has loaded so now remove the old BG image from backgrounds array
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)


    this.loadingBGImage = false
  }
}
