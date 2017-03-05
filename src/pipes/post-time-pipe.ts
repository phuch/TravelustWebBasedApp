import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the PostTimePipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'post-time-pipe'
})
@Injectable()
export class PostTimePipe {
  /*
    Takes a time (in mil) and determine the difference from now
   */
  transform(postTime: number, args?) {
    let value = Date.now() - postTime;
    //Change mil -> sec
    value = Math.floor(value /= 1000); // value in secs 
    if (value < 1) // time < 1 sec
        return "just now"
    else if (value >= 1 && value < 60) // 1 sec <= time < 1 minute 
    {
        return value + "s ago"
        // if (value == 1)
        //     return value + " second ago"
        // else
        //     return value + " seconds ago"
    }
    //Change sec -> minute
    value = Math.floor(value /= 60); // value in minutes
    if (value >= 1 && value < 60) // 1 minute <= time < 1 hour 
    {
        return value + "m ago"
        // if (value == 1)
        //     return value + " minute ago"
        // else
        //     return value + " minutes ago"
    }
    //Change minute -> hour
    value = Math.floor(value /= 60); // value in hours
    if (value >= 1 && value < 24) // 1 hour <= time < 1 day 
    {
        return value + "h ago"
        // if (value == 1)
        //     return value + " hour ago"
        // else
        //     return value + " hours ago"
    }
    //Change hour -> day
    value = Math.floor(value /= 24); // value in days
    if (value >= 1 && value < 7){
        return value + "d ago"
        // if (value == 1)
        //     return value + " day ago"
        // else
        //     return value + " days ago"
    }
    //Change day -> week
    value = Math.floor(value /= 7) // value in week
    if (value == 1){
        return value + " w ago"
    }
    else {
        return "false"
    }
  }
}
